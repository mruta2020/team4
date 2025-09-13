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
