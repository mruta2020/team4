import {ChainRecord, LedgerState} from "./types";


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

export function listAll() { return db; }
