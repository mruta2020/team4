// src/detect.ts
import type { Express } from "express";
import {Detected} from "./types";

function pemToDer(pem: string): Buffer {
    const b64 = pem.replace(/-----BEGIN [^-]+-----/g, "")
        .replace(/-----END [^-]+-----/g, "")
        .replace(/\s+/g, "");
    return Buffer.from(b64, "base64");
}
function looksLikeJwt(s: string) { return s.split(".").length === 3; }

//PAdES signature
function pdfMaybeSigned(buf: Buffer): boolean {
    const s = buf.toString("latin1"); // no UTF-8 per non perdere byte 0x80+
    return /\/Type\s*\/Sig|\/ByteRange\s*\[|\/SubFilter\s*\/adbe\.pkcs7/i.test(s)
        || /\/SubFilter\s*\/ETSI\.R|\/DocTimeStamp|Adobe\.PPKLite/i.test(s);
}

export function detectFromFile(file?: Express.Multer.File): Detected {
    if (!file) return { kind: "UNKNOWN", raw : Buffer.from("")   };

    const mime = (file.mimetype || "").toLowerCase();
    const name = (file.originalname || "").toLowerCase();
    const text = file.buffer.toString("utf-8");

    // VC-JWT come file .jwt/.txt contenente "a.b.c"
    if (name.endsWith(".jwt") || name.endsWith(".txt")) {
        const token = text.trim();
        if (looksLikeJwt(token)) return { kind: "VC-JWT", jwt: token, raw: file.buffer };
    }

    // VC-JWT come file .json: { "vcJwt": "a.b.c" }
    if (mime === "application/json" || name.endsWith(".json")) {
        try {
            const content = JSON.parse(text);
            if (typeof content?.vcJwt === "string" && looksLikeJwt(content.vcJwt)) {
                return { kind: "VC-JWT", jwt: content.vcJwt, raw: file.buffer };
            }
        } catch {/* ignore */}
    }

    if (mime === "application/pdf" || name.endsWith(".pdf") || file.buffer.slice(0,5).toString() === "%PDF-") {
        return { kind: "PDF", raw: file.buffer, maybeSigned: pdfMaybeSigned(file.buffer) };
    }

    // PEM certificate
    if (text.includes("-----BEGIN CERTIFICATE-----"))
        return { kind: "PKI-CERT", der: pemToDer(text), raw: file.buffer };

    // PEM PKCS#7/CMS
    if (text.includes("-----BEGIN PKCS7-----") || text.includes("-----BEGIN CMS-----"))
        return { kind: "PKI-P7M", der: pemToDer(text), raw: file.buffer };

    // PKCS#7/CMS DER (.p7m/.p7s)
    if (mime.includes("pkcs7") || name.endsWith(".p7m") || name.endsWith(".p7s"))
        return { kind: "PKI-P7M", der: file.buffer, raw: file.buffer };

    // X.509 DER (.cer/.der/.crt)
    if (name.endsWith(".cer") || name.endsWith(".der") || name.endsWith(".crt") || file.buffer[0] === 0x30)
        return { kind: "PKI-CERT", der: file.buffer, raw: file.buffer };

    return { kind: "UNKNOWN" , raw: file.buffer};
}
