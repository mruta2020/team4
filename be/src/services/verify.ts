import {verifyCert} from "./chain";

export class VerifyService {
    static async verifyHash(req: any, res: any) : Promise<any> {
        const { certId, hash } = req.body || {};
        if (!certId || !hash) {
            return res.status(400).json({ error: "certId and hash is required" });
        }
        const normalized = this.normalizeHex(hash);
        const r = verifyCert(certId, normalized); // 'valid' | 'revoked' | 'mismatch' | 'not-found'
        res.json({ certId, hash: normalized, ledgerStatus: r.state });
    }

    private static normalizeHex(h: any) {
        const v = h.trim().toLowerCase();
        return v.startsWith("0x") ? v : `0x${v}`;
    }
}
