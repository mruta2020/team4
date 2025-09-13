import {listAll, verifyCert} from "../chain";


export class ReadService {

    static async read(req: any, res: any) {
        const rows = listAll()
            .map(r => ({
                certId: r.certId,
                fileName: r.fileName ?? null,
                hash: r.hash,                       // contentHash
                status: r.revoked ? "revoked" : "valid",
                issuedAt: r.issuedAt,               // epoch ms
                txHash: r.txHash,
                blockNumber: r.blockNumber
            }))
            .sort((a, b) => b.issuedAt - a.issuedAt); // più recenti in alto

        res.json(rows);
    }
}

