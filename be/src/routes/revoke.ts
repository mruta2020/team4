import { Router } from "express";
import { revokeCert } from "../chain";

const router = Router();

router.post("/", (req, res) => {
    try {
        const { certId } = req.body;
        if (!certId) {
            return res.status(400).json({ error: "certId is required" });
        }
        const result = revokeCert(certId);
        res.json(result);
    } catch (e: any) {
        res.status(500).json({ error: e.message });
    }
});

export default router;
