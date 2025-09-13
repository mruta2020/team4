import {Issuer} from "./issuer.model";

export class Certificate {
  id: string;
  name: string;
  state: string;
  issuer: Issuer;
}
