import {issueCert, listAll, verifyCert} from "./chain";
import path from "path";
import fs from "fs";
import {VerifyService} from "./verify";
import {detectFromFile} from "./detect";
import {SignatureService} from "./signature";
import {sha256Hex} from "./hash";
import {v4 as uuidv4} from "uuid";
import {CertificateResponse} from "../types";


export class CertificateService {

    static async upload(req:any, res:any) {
        const file = req.file as Express.Multer.File | undefined;
        if (!file) return res.status(400).json({ error: "file richiesto" });

        // 1) Detect (oggi: solo PDF)
        const detected = detectFromFile(file);
        if (detected.kind !== "PDF") {
            return res.status(415).json({ error: "Sono supportati solo PDF in questa versione" });
        }
        if (detected.maybeSigned) {
            return res.status(400).json({ error: "PDF firmato non supportato in questa versione" });
        }

        // 2) SignatureService (hook: oggi ritorna no-signature)
        const outcome = await SignatureService.verifySignature(detected);

        // 3) Hash canonico (bytes del PDF)
        const contentHash = sha256Hex(outcome.hashInput);

        // 4) "Invio" alla fake chain (issue)
        const certId = uuidv4();
        const ownerId = "anonymous" //from spid token
        const { txHash, blockNumber } = issueCert(certId, contentHash, file.originalname,ownerId);

        // 5) Salva file su disco
        const uploadsDir = path.join(__dirname, "../../uploads");
        if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });
        const ext = path.extname(req.file.originalname);
        const savePath = path.join(uploadsDir, `${certId}${ext}`);
        fs.writeFileSync(savePath, file.buffer);


        // 6) Stato ledger (per completezza)
        const ledger = verifyCert(certId, contentHash);

        return res.json({
            message: "PDF caricato e ancorato su fake chain",
            certId,
            txHash,
            blockNumber,
            ledgerStatus: ledger.state,           // "valid"
            detected: outcome.detected,           // "PDF"
            verifiedSignature: outcome.verifiedSignature, // false
            signatureReason: outcome.signatureReason,     // "no-signature"
            contentHash,
            fileName: file.originalname,
            size: file.size
        });
    }

    static async readList(req: any, res: any) {
        const rows =listAll()
            .map(async r => {

                const verify = await VerifyService.verifyHash({body: {certId: r.certId, hash: r.hash}}, res);

                return {
                id: r.certId,
                name: r.fileName || "",
                state: verify?.ledgerStatus,
                issuer: {
                    id: "1",
                    name: "ID Cert"
                },
                issueDate: new Date(r.issuedAt),
                algorithm: "SHA-256",
                version: "1.0",
                fingerprint: r.hash,
                isVerified: !r.revoked,
                verificationDate: new Date(r.issuedAt)
            }});
           // .sort((a, b) => (await b).issuedAt - (await a).issuedAt); // più recenti in alto

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

