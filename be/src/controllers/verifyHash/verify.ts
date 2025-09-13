import {Router} from "express";
import {VerifyService} from "../../services/verify";

const router = Router();

router.post("/", (req, res) => {
    try {
        return VerifyService.verifyHash(req, res);
    } catch (e: any) {
        res.status(500).json({ error: e.message });
    }
});

export default router;
