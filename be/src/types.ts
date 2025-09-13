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

export type LedgerState = "not-found" | "valid" | "revoked" | "mismatch";

export type ChainRecord = {
    certId: string;
    hash: string;
    revoked: boolean;
    issuedAt: number;
    txHash: string;
    blockNumber: number;
    fileName?: string;
    ownerId?: string;
};
export type CertificateResponse = {
    id: string;
    name: string;
    state: string;
    issuer: Issuer;
    issueDate: Date;
    algorithm: string;
    version: string;
    fingerprint: string;
    isVerified: boolean;
    verificationDate: Date;
}

export type Issuer = {
    id: string;
    name: string;
}
