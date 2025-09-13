import express from "express";
import bodyParser from "body-parser";
import { revokeCert, listAllCerts } from "./chain";
import uploadRouter from "./controllers/upload/upload";

const app = express();
app.use(bodyParser.json());

app.post("/revoke", (req, res) => {
    try {
        const { certId } = req.body;
        if (!certId) return res.status(400).json({ error: "certId is required" });
        const r = revokeCert(certId);
        res.json(r);
    } catch (e: any) {
        res.status(500).json({ error: e.message });
    }
});

app.use("/upload", uploadRouter);

app.get("/ledger", (_, res) => res.json(listAllCerts()));

app.listen(3000, () => console.log("Server on http://localhost:3000"));
