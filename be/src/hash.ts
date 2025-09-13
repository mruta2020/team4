import { createHash } from "crypto";
export function sha256Hex(data: Buffer | string) {
    const buf = Buffer.isBuffer(data) ? data : Buffer.from(data, "utf8");
    return "0x" + createHash("sha256").update(buf).digest("hex");
}
