import { createHash } from 'crypto';
import { keccak256, toUtf8Bytes } from "ethers";

export function hashString(input: string): string {
    const hash = createHash('sha256');
    hash.update(input);
    return hash.digest('hex');
}

export function sha256Hex(data: Buffer | string) {
    const buf = Buffer.isBuffer(data) ? data : Buffer.from(data, "utf8");
    return "0x" + createHash("sha256").update(buf).digest("hex");
}
