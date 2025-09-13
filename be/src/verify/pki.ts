
export async function verifyPkcs7(
    der: Buffer,
    detachedContent?: Buffer
): Promise<{ ok: boolean; reason?: string; signerSubject?: string }> {
    return { ok: false, reason: "not-implemented" };
}
export async function parseX509(der: Buffer): Promise<{ ok: boolean; subject?: string; issuer?: string; reason?: string }> {
    return { ok: false, reason: "not-implemented" };
}
