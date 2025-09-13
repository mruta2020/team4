export type Detected =
    | { kind: "VC-JWT"; jwt: string }
    | { kind: "PKI-P7M"; der: Buffer }     // PKCS#7/CMS (.p7m/.p7s) DER
    | { kind: "PKI-CERT"; der: Buffer }    // X.509 singolo (DER)
    | { kind: "UNKNOWN" };

export function detectFromUpload(file?: Express.Multer.File, body?: any): Detected {
    if (file) {
        const mime = file.mimetype?.toLowerCase() || "";
        const name = file.originalname.toLowerCase();

        // VC-JWT: string composed of 3 parts separated by dots
        if (mime === "application/json" || name.endsWith(".json")) {
            const content = JSON.parse(file.buffer.toString("utf-8"));
            if (typeof content?.vcJwt === "string" && content.vcJwt.split(".").length === 3) {
                return { kind: "VC-JWT", jwt: content.vcJwt };
            }
        }

        // PKCS#7/CMS (.p7m, .p7s)
        if (
            mime.includes("pkcs7") ||
            name.endsWith(".p7m") ||
            name.endsWith(".p7s")
        ) return { kind: "PKI-P7M", der: file.buffer };

        // X.509 raw (.cer/.der/.crt) — DER usually starts with 0x30 (ASN.1 SEQUENCE)
        if (name.endsWith(".cer") || name.endsWith(".der") || name.endsWith(".crt") || file.buffer[0] === 0x30) {
            return { kind: "PKI-CERT", der: file.buffer };
        }
    }

    return { kind: "UNKNOWN" };
}
