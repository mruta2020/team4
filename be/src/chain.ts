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

const db: ChainRecord[] = [];
let height = 1;
const makeTx = () => "0xAAAA" + Date.now().toString(16) + Math.random().toString(16).slice(2, 8);

export function issueCert(certId: string, hash: string, fileName?: string,ownerId?:string) {
    if (db.find(r => r.certId === certId)) throw new Error("exists");
    const rec: ChainRecord = {
        certId,
        hash,
        revoked: false,
        issuedAt: Date.now(),
        txHash: makeTx(),
        blockNumber: height++,
        fileName,
        ownerId
    };
    db.push(rec);
    return { txHash: rec.txHash, blockNumber: rec.blockNumber, record: rec };
}

export function verifyCert(certId: string, hash: string): { state: LedgerState } {
    const rec = db.find(r => r.certId === certId);
    if (!rec) return { state: "not-found" };
    if (rec.revoked) return { state: "revoked" };
    return rec.hash === hash ? { state: "valid" } : { state: "mismatch" };
}

export function revokeCert(certId: string) {
    const rec = db.find(r => r.certId === certId);
    if (!rec) throw new Error("not-found");
    rec.revoked = true;
    return { txHash: makeTx(), blockNumber: height++ };
}

export function listAll() { return db; }
