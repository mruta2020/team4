import {UserType} from "../types/types";

export class User {
  id: string;
  name?: string;
  surname?: string;
  legalName?: string;
  type: UserType;
}
