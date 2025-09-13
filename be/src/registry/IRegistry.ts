export type CertRecord = {
    certId: string;
    hash: string;
    revoked: boolean;
    issuedAt: number;
};


export interface IRegistry {
    issue(certId: string, payload: string): Promise<{ txHash: string; record: CertRecord }>;
    verify(certId: string, payload: string): Promise<{ valid: boolean; reason: string }>;
    revoke(certId: string): Promise<{ txHash: string }>;
    listAll?(): Promise<CertRecord[]>;
}
