import {v4 as uuidv4} from "uuid";
import {sha256Hex} from "../hash";
import {detectFromFile} from "../detect";
import {SignatureService} from "./signature";
import path from "path";
import fs from "fs";
import {issueCert, verifyCert} from "../chain";


export class UpdateService {

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
        const { txHash, blockNumber } = issueCert(certId, contentHash, file.originalname);

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
}

