import { Router } from "express";
import { hashString } from "../hashUtils";
import { issueCertOnChain } from "../chain";

const router = Router();

router.post("/", (req, res) => {
    try {
        const { certId, payload } = req.body;
        if (!certId || !payload) {
            return res.status(400).json({ error: "certId e payload richiesti" });
        }
        const hash = hashString(payload);
        const { txHash, record } = issueCertOnChain(certId, hash);
        res.json({ txHash, hash, cert: record });
    } catch (e: any) {
        res.status(500).json({ error: e.message });
    }
});

export default router;
