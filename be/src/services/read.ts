import {listAll} from "./chain";
import path from "path";
import fs from "fs";
import {VerifyService} from "./verify";
import {CertificateResponse} from "../types";


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
        const verify = await VerifyService.verifyHash({body: {certId, hash: rec.hash}}, res);

        const certificateResponse : CertificateResponse = {
            id: rec.certId,
            name: rec.fileName || "",
            state: verify?.ledgerStatus,
            issuer: {
                id: "1",
                name: "ID Cert"
            },
            issueDate: new Date(rec.issuedAt),
            algorithm: "SHA-256",
            version: "1.0",
            fingerprint: rec.hash,
            isVerified: !rec.revoked,
            verificationDate: new Date(rec.issuedAt)
        }
        return (res.json({ ...certificateResponse, size, hasFile }));
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

