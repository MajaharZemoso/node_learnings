import { STATUS_CODES } from "../utils/stringConstants/constants";

export class UserAlreadyExist extends Error {
  statusCode: number;
  constructor(message: string) {
    super(message);
    this.statusCode = STATUS_CODES.USER_EXIST;
  }
}
