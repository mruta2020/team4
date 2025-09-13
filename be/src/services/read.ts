import {listAll} from "../chain";
import path from "path";
import fs from "fs";


export class ReadService {

    static async readList(req: any, res: any) {
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

    static async readById(req: any, res: any) {
        const { certId } = req.params;
        const rec = listAll().find(r => r.certId === certId);
        if (!rec) return res.status(404).json({ error: "not-found" });

        const uploadsDir = path.resolve(__dirname, "../../uploads");
        const ext = rec.fileName ? path.extname(rec.fileName) || ".pdf" : ".pdf";
        const filePath = path.join(uploadsDir, `${certId}${ext}`);
        const hasFile = fs.existsSync(filePath);
        const size = hasFile ? fs.statSync(filePath).size : null;

        res.json({
            certId: rec.certId,
            fileName: rec.fileName ?? (hasFile ? `${certId}${ext}` : null),
            hash: rec.hash,
            status: rec.revoked ? "revoked" : "valid",
            issuedAt: rec.issuedAt,
            txHash: rec.txHash,
            blockNumber: rec.blockNumber,
            hasFile,
            size
        });
    }

    static async downloadById(req: any, res: any) {
        const { certId } = req.params;
        const rec = listAll().find(r => r.certId === certId);
        if (!rec) return res.status(404).json({ error: "not-found" });

        const uploadsDir = path.resolve(__dirname, "../../uploads");
        const ext = rec.fileName ? path.extname(rec.fileName) || ".pdf" : ".pdf";
        const filePath = path.join(uploadsDir, `${certId}${ext}`);

        if (!fs.existsSync(filePath)) {
            return res.status(404).json({ error: "file-not-found" });
        }

        const downloadName = rec.fileName ?? `${certId}${ext}`;
        res.download(filePath, downloadName);
    }
}

