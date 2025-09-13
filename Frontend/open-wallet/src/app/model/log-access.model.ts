import {Certificate} from "./certificate.model";
import {LogAccessState} from "../types/log-access-status.type";

export class LogAccess {
  id: number;
  date: Date;
  user: string;
  accessType: string;
  ip: string;
  certificate: Certificate;
  status: LogAccessState;
  location?: string;
}
