import { Router } from "express";
import { hashString } from "../hashUtils";
import { verifyCert } from "../chain";

const router = Router();

router.post("/", (req, res) => {
    try {
        const { certId, payload } = req.body;
        if (!certId || !payload) {
            return res.status(400).json({ error: "certId and payload are required " });
        }
        const hash = hashString(payload);
        const result = verifyCert(certId, hash);
        res.json(result);
    } catch (e: any) {
        res.status(500).json({ error: e.message });
    }
});

export default router;
