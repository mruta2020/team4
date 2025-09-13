import express from "express";
import bodyParser from "body-parser";
import issueRouter from "./routes/issue";
import verifyRouter from "./routes/verify";
import revokeRouter from "./routes/revoke";
import { listAllCerts } from "./chain";

const app = express();
app.use(bodyParser.json());

app.use("/issue", issueRouter);
app.use("/verify", verifyRouter);
app.use("/revoke", revokeRouter);


app.get("/ledger", (req, res) => {
    res.json(listAllCerts());
});

app.listen(3000, () => {
    console.log("chain server active on http://localhost:3000");
});
