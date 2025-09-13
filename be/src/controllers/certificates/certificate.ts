import {Router} from "express";
import {CertificateService} from "../../services/certificate";
import multer from "multer";

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });


router.post("/", upload.single("file"), async (req, res) => {
    try {

        return CertificateService.upload(req, res);

    } catch (e: any) {
        res.status(500).json({ error: e.message });
    }
});

router.get("/", async (req, res) => {
    try {
        return CertificateService.readList(req, res);
    } catch (e: any) {
        res.status(500).json({error: e.message});
    }
});

router.get("/:certId", (req, res) => {
    try {
        return CertificateService.readById(req, res);
    } catch (e: any) {
        res.status(500).json({error: e.message});
    }
});
router.get("/:certId/download", (req, res) => {
    try {
        return CertificateService.downloadById(req, res);
    } catch (e: any) {
        res.status(500).json({error: e.message});
    }
});


export default router;
