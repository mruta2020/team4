// src/detect.ts
import type { Express } from "express";

export type Detected =
    | { kind: "VC-JWT"; jwt: string }
    | { kind: "PKI-P7M"; der: Buffer }
    | { kind: "PKI-CERT"; der: Buffer }
    | { kind: "UNKNOWN" };

function pemToDer(pem: string): Buffer {
    const b64 = pem.replace(/-----BEGIN [^-]+-----/g, "")
        .replace(/-----END [^-]+-----/g, "")
        .replace(/\s+/g, "");
    return Buffer.from(b64, "base64");
}
function looksLikeJwt(s: string) { return s.split(".").length === 3; }

export function detectFromFile(file?: Express.Multer.File): Detected {
    if (!file) return { kind: "UNKNOWN" };

    const mime = (file.mimetype || "").toLowerCase();
    const name = (file.originalname || "").toLowerCase();
    const text = file.buffer.toString("utf-8");

    // VC-JWT come file .jwt/.txt contenente "a.b.c"
    if (name.endsWith(".jwt") || name.endsWith(".txt")) {
        const token = text.trim();
        if (looksLikeJwt(token)) return { kind: "VC-JWT", jwt: token };
    }

    // VC-JWT come file .json: { "vcJwt": "a.b.c" }
    if (mime === "application/json" || name.endsWith(".json")) {
        try {
            const content = JSON.parse(text);
            if (typeof content?.vcJwt === "string" && looksLikeJwt(content.vcJwt)) {
                return { kind: "VC-JWT", jwt: content.vcJwt };
            }
        } catch {/* ignore */}
    }

    // PEM certificate
    if (text.includes("-----BEGIN CERTIFICATE-----"))
        return { kind: "PKI-CERT", der: pemToDer(text) };

    // PEM PKCS#7/CMS
    if (text.includes("-----BEGIN PKCS7-----") || text.includes("-----BEGIN CMS-----"))
        return { kind: "PKI-P7M", der: pemToDer(text) };

    // PKCS#7/CMS DER (.p7m/.p7s)
    if (mime.includes("pkcs7") || name.endsWith(".p7m") || name.endsWith(".p7s"))
        return { kind: "PKI-P7M", der: file.buffer };

    // X.509 DER (.cer/.der/.crt)
    if (name.endsWith(".cer") || name.endsWith(".der") || name.endsWith(".crt") || file.buffer[0] === 0x30)
        return { kind: "PKI-CERT", der: file.buffer };

    return { kind: "UNKNOWN" };
}
