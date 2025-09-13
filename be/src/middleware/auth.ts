import type { Request, Response, NextFunction } from "express";

const JWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.KMUFsIDTnFmyG3nMiGM6H9FNFUROf3wh7SmqJp-QV30";

export function auth(req: Request, res: Response, next: NextFunction) {
    const auth = req.header("authorization") || "";
    const m = auth.match(/^Bearer\s+(.+)$/i);
    const token = m?.[1];

    if (!token) {
        return res.status(401).json({ error: "missing token" });
    }
    if (token !== JWT) {
        return res.status(403).json({ error: "invalid token" });
    }

    next();
}
