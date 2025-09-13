import jwt, { SignOptions } from "jsonwebtoken";
import {JWT_SECRET} from "../config";

export function initToken(): string {
    const payload = { id: 1, email: "utente@example.com" };
    const options: SignOptions = { expiresIn: "2h", algorithm: "HS256" };
    return jwt.sign(payload, JWT_SECRET, options);
}
