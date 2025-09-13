import { createHash } from 'crypto';
import { keccak256, toUtf8Bytes } from "ethers";

export function hashString(input: string): string {
    const hash = createHash('sha256');
    hash.update(input);
    return hash.digest('hex');
}

export function sha256Hex(input: string) {
    return keccak256(toUtf8Bytes(input));
}
