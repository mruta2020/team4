import { Detected } from "../types";

// Heuristics PAdES solo per bloccare PDF firmati in questa versione
function pdfMaybeSigned(buf: Buffer): boolean {
    const s = buf.toString("latin1");
    return /\/Type\s*\/Sig|\/ByteRange\s*\[|\/SubFilter\s*\/adbe\.pkcs7|\/ETSI\./i.test(s);
}

export function detectFromFile(file?: Express.Multer.File): Detected {
    if (!file) return { kind: "UNKNOWN", raw: Buffer.alloc(0) };

    const isPdf =
        file.mimetype === "application/pdf" ||
        file.originalname.toLowerCase().endsWith(".pdf") ||
        file.buffer.slice(0, 5).toString("ascii") === "%PDF-";

    if (isPdf) {
        return { kind: "PDF", raw: file.buffer, maybeSigned: pdfMaybeSigned(file.buffer) };
    }

    // VC-JWT / PKI-P7M / PKI-CERT
    return { kind: "UNKNOWN", raw: file.buffer };
}
