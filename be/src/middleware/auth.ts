import type { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import {JWT_SECRET} from "../config";

export function auth(req: Request, res: Response, next: NextFunction) {
    const m = (req.header("authorization") || "").match(/^Bearer\s+(.+)$/i);
    const token = m?.[1];
    if (!token) return res.status(401).json({ error: "missing token" });

    try {
        const payload = jwt.verify(token, JWT_SECRET ) as JwtPayload & {
            id?: number; email?: string;
        };

        (req as any).user = { id: payload.id, email: payload.email };
        return next();
    } catch (e: any) {
        return res.status(401).json({ error: "invalid token", detail: e.message });
    }
}
