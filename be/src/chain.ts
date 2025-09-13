import {IssueResult,CertRecord} from "./types";

const db: CertRecord[] = [];

//simulate issue cert on blockchain
export function issueCertOnChain(certId : string, hash : string): IssueResult {

    const exists = db.find(c => c.certId === certId);
    if (exists) throw new Error("Cert already issued");

    const record: CertRecord = {
        certId,
        hash,
        revoked: false,
        issuedAt: Date.now()
    };

    db.push(record);
    return { txHash: "0xFAKE" + Date.now().toString(16), record }
}


//Simulate verify on blockchain
export function verifyCert(certId: string, hash: string) {
    const cert = db.find(c => c.certId === certId && c.hash === hash);
    if (!cert) return { valid: false, reason: "not-found" };
    if (cert.revoked) return { valid: false, reason: "revoked" };
    return { valid: true, reason: "ok" };
}


//Revoke cert on blockchain
export function revokeCert(certId: string) {
    const cert = db.find(c => c.certId === certId);
    if (!cert) throw new Error("Cert not found");
    if (cert.revoked) throw new Error("already revoked");

    cert.revoked = true;
    return { txHash: "0xFAKE" + Date.now().toString(16) };
}

export function listAllCerts() {
    return db;
}
