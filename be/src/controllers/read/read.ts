import { Router } from "express";
import multer from "multer";
import {ReadService} from "../../services/read";

const router = Router();
const read = multer({ storage: multer.memoryStorage() });


router.get("/", async (req, res) => {
    try {

        return ReadService.read(req, res);

    } catch (e: any) {
        res.status(500).json({ error: e.message });
    }
});


export default router;
