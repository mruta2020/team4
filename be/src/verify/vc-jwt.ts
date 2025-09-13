import { createRemoteJWKSet, jwtVerify } from "jose";

export type VcVerifyResult = { ok: boolean; reason?: string; payload?: any; issuer?: string };

export async function verifyVcJwt(jwt: string, jwksUrlFromClient?: string): Promise<VcVerifyResult> {
    try {
        const [h] = jwt.split(".");
        const header = JSON.parse(Buffer.from(h, "base64url").toString());
        const jwksUrl: string | undefined = jwksUrlFromClient || header.jku;

        if (!jwksUrl) return { ok: false, reason: "no-jwks-url" };

        const JWKS = createRemoteJWKSet(new URL(jwksUrl));
        const { payload, protectedHeader } = await jwtVerify(jwt, JWKS);

        if (payload.exp && Date.now() >= Number(payload.exp) * 1000) {
            return { ok: false, reason: "expired", payload };
        }

        return { ok: true, payload, issuer: String(payload.iss ?? "") };
    } catch (e: any) {
        return { ok: false, reason: e.message };
    }
}
