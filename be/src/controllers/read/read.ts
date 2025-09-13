import {Router} from "express";
import {ReadService} from "../../services/read";

const router = Router();

router.get("/", async (req, res) => {
    try {
        return ReadService.readList(req, res);
    } catch (e: any) {
        res.status(500).json({error: e.message});
    }
});

router.get("/:certId", (req, res) => {
    try {
        return ReadService.readById(req, res);
    } catch (e: any) {
        res.status(500).json({error: e.message});
    }
});
router.get("/:certId/download", (req, res) => {
    try {
        return ReadService.downloadById(req, res);
    } catch (e: any) {
        res.status(500).json({error: e.message});
    }
});


export default router;
