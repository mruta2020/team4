import express from "express";
import bodyParser from "body-parser";
import ingestRouter from "./routes/ingest";
import verifyFileRouter from "./routes/verify-file";
import { revokeCert, listAllCerts } from "./chain";

const app = express();
app.use(bodyParser.json());

app.use("/ingest", ingestRouter);       // upload + signature verify + issue  ledger
app.use("/verify-file", verifyFileRouter);

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

app.get("/ledger", (_, res) => res.json(listAllCerts()));

app.listen(3000, () => console.log("Server on http://localhost:3000"));
