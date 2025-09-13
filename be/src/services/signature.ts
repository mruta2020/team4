import {VerificationOutcome, Detected, SignatureAux} from "../types";
import { verifyVcJwt } from "../verify/vc-jwt";
import { verifyPkcs7, parseX509 } from "../verify/pki";

export class SignatureService {


    static async verifySignature(d: Detected, aux: SignatureAux = {}): Promise<VerificationOutcome> {
        if (d.kind === "VC-JWT") {
            const r = await verifyVcJwt(d.jwt, aux.jwksJson);
            return {
                detected: "VC-JWT",
                verifiedSignature: r.ok,
                signatureReason: r.ok ? "ok" : (r.reason || "vc-verify-failed"),
                signatureMeta: { issuer: r.issuer },
                hashInput: d.jwt,
            };
        }
        if (d.kind === "PKI-P7M") {
            const r = await verifyPkcs7(d.der, aux.originalContent);
            return {
                detected: "PKI-P7M",
                verifiedSignature: r.ok,
                signatureReason: r.ok ? "ok" : (r.reason || "pki-verify-failed"),
                signatureMeta: { signerSubject: r.signerSubject },
                hashInput: d.der,
            };
        }
        if (d.kind === "PKI-CERT") {
            const r = await parseX509(d.der);
            return {
                detected: "PKI-CERT",
                verifiedSignature: r.ok,
                signatureReason: r.ok ? "certificate-parsed" : (r.reason || "cert-parse-failed"),
                signatureMeta: { subject: r.subject, issuer: r.issuer },
                hashInput: d.der,
            };
        }
        return {
            detected: "UNKNOWN",
            verifiedSignature: false,
            signatureReason: "unsupported-or-unsigned",
            hashInput: d?.raw || ""
        };
    }
}

