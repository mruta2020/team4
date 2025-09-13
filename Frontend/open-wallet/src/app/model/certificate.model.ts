import {Issuer} from "./issuer.model";

export class Certificate {
  id: string;
  name: string;
  state: string;
  issueDate?: Date;
  algorithm?: string;
  version?: string;
  fingerprint?: string;
  isVerified?: boolean;
  verificationDate?: Date;
  issuer?: Issuer;
}
