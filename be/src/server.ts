import { Router, type Express } from "express";
import express from "express";
import bodyParser from "body-parser";
import uploadRouter from "./controllers/upload/upload";


const router = Router();

const app = express();
app.use(bodyParser.json());

app.use("/upload", uploadRouter);

app.listen(3000, () => console.log("Server on http://localhost:3000"));
