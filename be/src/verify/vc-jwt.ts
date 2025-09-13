export type VcVerifyResult = { ok: boolean; reason?: string; payload?: any; issuer?: string };

export async function verifyVcJwt(jwt: string, jwksJson?: any): Promise<VcVerifyResult> {
    return { ok: false, reason: "not-implemented" };
}
