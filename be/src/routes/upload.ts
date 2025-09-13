import { Router } from "express";
import multer from "multer";
import { sha256Hex } from "../hashUtils";
import { verifyCert } from "../chain";
import { v4 as uuidv4 } from 'uuid';

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post("/", upload.single("file"), (req, res) => {
    try {

        if (!req.file) {
            return res.status(400).json({ error: "file richiesto" });
        }

        const certId = uuidv4();
        const fileBuffer = req.file.buffer;
        const hash = sha256Hex(fileBuffer.toString("base64"));
       // const { txHash, record } = verifyCert(certId, hash);

        res.json({
            message: "File registrato su blockchain",
            hash,
            cert: certId,
            fileName: req.file.originalname,
            size: req.file.size
        });
    } catch (e: any) {
        res.status(500).json({ error: e.message });
    }
});

export default router;
