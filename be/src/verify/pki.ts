import * as asn1js from "asn1js";
import * as pkijs from "pkijs";

export async function verifyPkcs7(der: Buffer): Promise<{ ok: boolean; reason?: string; signerSubject?: string }> {
    try {
        const asn1 = asn1js.fromBER(new Uint8Array(der).buffer);
        if (asn1.offset === -1) return { ok: false, reason: "bad-asn1" };

        const contentInfo = new pkijs.ContentInfo({ schema: asn1.result });
        const signedData = new pkijs.SignedData({ schema: contentInfo.content });

        // Verify signature (detached, no content)
        const verify = await signedData.verify({ signer: 0, content: new ArrayBuffer(0) });
        if (!verify) return { ok: false, reason: "bad-cms-signature" };

        // Subject info
        const cert = signedData.certificates?.[0] as pkijs.Certificate | undefined;
        const signerSubject = cert
            ? cert.subject.typesAndValues.map(tv => tv.value.valueBlock.value).join(", ")
            : undefined;

        return { ok: true, signerSubject };
    } catch (e: any) {
        return { ok: false, reason: e.message };
    }
}

/**
 * Minimal Parsing X.509  (no chain).
 */
export async function parseX509(der: Buffer): Promise<{ ok: boolean; subject?: string; issuer?: string; reason?: string }> {
    try {
        const asn1 = asn1js.fromBER(new Uint8Array(der).buffer);
        if (asn1.offset === -1) return { ok: false, reason: "bad-asn1" };
        const cert = new pkijs.Certificate({ schema: asn1.result });
        const subject = cert.subject.typesAndValues.map(tv => tv.value.valueBlock.value).join(", ");
        const issuer = cert.issuer.typesAndValues.map(tv => tv.value.valueBlock.value).join(", ");
        return { ok: true, subject, issuer };
    } catch (e: any) {
        return { ok: false, reason: e.message };
    }
}
