import { Detected, SignatureAux, VerificationOutcome } from "./types";

export const SignatureService = {
    async verifySignature(d: Detected, _aux: SignatureAux = {}): Promise<VerificationOutcome> {
        if (d.kind === "PDF") {
            return {
                detected: "PDF",
                verifiedSignature: false,
                signatureReason: d.maybeSigned ? "pades-detected-not-supported" : "no-signature",
                signatureMeta: { maybeSignedPAdES: !!d.maybeSigned },
                hashInput: d.raw, // notarizziamo l'intero PDF
            };
        }
        // VC-JWT / PKI-P7M / PKI-CERT → verifiedSignature true/false reale
        return {
            detected: d.kind,
            verifiedSignature: false,
            signatureReason: "unsupported-in-this-version",
            hashInput: d.raw,
        };
    },
};
