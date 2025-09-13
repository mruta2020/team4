import { Router } from "express";
import multer from "multer";
import { sha256Hex } from "../hashUtils";
import { verifyCert } from "../chain";

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post("/", upload.single("file"), (req, res) => {
    try {
        const { certId } = req.body;
        if (!req.file || !certId) {
            return res.status(400).json({ error: "certId e file richiesti" });
        }

        const fileBuffer = req.file.buffer;
        const hash = sha256Hex(fileBuffer.toString("base64"));
        const result = verifyCert(certId, hash);

        res.json({
            certId,
            fileName: req.file.originalname,
            hash,
            ...result
        });
    } catch (e: any) {
        res.status(500).json({ error: e.message });
    }
});

export default router;
