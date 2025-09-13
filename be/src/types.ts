export type CertRecord = {
    certId: string;
    hash: string;
    revoked: boolean;
    issuedAt: number;
}
export type IssueResult = {
    txHash: string;
    record: CertRecord;
}

export type DetectedKind = "VC-JWT" | "PKI-P7M" | "PKI-CERT" | "PDF" | "UNKNOWN";

export type Detected =
    | { kind: "VC-JWT"; jwt: string; raw: Buffer }
    | { kind: "PKI-P7M"; der: Buffer; raw: Buffer }
    | { kind: "PKI-CERT"; der: Buffer; raw: Buffer }
    | { kind: "PDF"; raw: Buffer; maybeSigned?: boolean }
    | { kind: "UNKNOWN"; raw: Buffer };

export type VerificationOutcome = {
    detected: DetectedKind;
    verifiedSignature: boolean;
    signatureReason: string;
    signatureMeta?: any;
    hashInput: Buffer | string;
};
export type SignatureAux = {
    originalContent?: Buffer;
    jwksJson?: any;
};
