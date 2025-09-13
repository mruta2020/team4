import { createLocalJWKSet, createRemoteJWKSet, jwtVerify } from "jose";

export type VcVerifyResult = { ok: boolean; reason?: string; payload?: any; issuer?: string };

export async function verifyVcJwt(jwt: string, jwksJson?: any): Promise<VcVerifyResult> {
    try {
        const [h] = jwt.split(".");
        const header = JSON.parse(Buffer.from(h, "base64url").toString("utf8"));

        const keyStore = jwksJson
            ? createLocalJWKSet(jwksJson)
            : header?.jku
                ? createRemoteJWKSet(new URL(header.jku))
                : null;

        if (!keyStore) return { ok: false, reason: "no-jwks" };

        const { payload } = await jwtVerify(jwt, keyStore);
        if (payload.exp && Date.now() >= Number(payload.exp) * 1000) {
            return { ok: false, reason: "expired", payload };
        }
        return { ok: true, payload, issuer: String(payload.iss ?? "") };
    } catch (e: any) {
        return { ok: false, reason: e.message };
    }
}
