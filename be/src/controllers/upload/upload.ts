import { Router } from "express";
import multer from "multer";
import {UpdateService} from "../../services/update"

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });


router.post("/", upload.single("file"), async (req, res) => {
    try {

        return UpdateService.upload(req, res);

    } catch (e: any) {
        res.status(500).json({ error: e.message });
    }
});


export default router;
