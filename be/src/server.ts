import { Router, type Express } from "express";
import express from "express";
import bodyParser from "body-parser";
import certificateRouter from "./controllers/certificates/certificate";
import verifyRouter from "./controllers/verifyHash/verify";

const router = Router();

const app = express();
app.use(bodyParser.json());

app.use("/certificate", certificateRouter);
app.use("/verify-hash", verifyRouter);

app.listen(3000, () => console.log("Server on http://localhost:3000"));

