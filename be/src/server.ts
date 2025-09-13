import { Router, type Express } from "express";
import express from "express";
import bodyParser from "body-parser";
import uploadRouter from "./controllers/upload/upload";
import readRouter from "./controllers/read/read";
import cors from "cors";
import verifyRouter from "./controllers/verifyHash/verify";
import {auth} from "./middleware/auth";

const router = Router();

const app = express();
app.use(bodyParser.json());

app.use(cors({
  origin: "http://localhost:4200"
}));

app.use("/certificates/upload",auth, uploadRouter);
app.use("/certificates",auth, readRouter);
app.use("/verify-hash",auth, verifyRouter);

app.listen(3000, () => console.log("Server on http://localhost:3000"));

