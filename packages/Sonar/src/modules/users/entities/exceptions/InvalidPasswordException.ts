import { BaseException } from "../../../../shared/domain/BaseException";

export class InvalidPasswordException extends Error implements BaseException {
  constructor(password: string) {
    super(`Password ${password} is invalid`);
    this.name = "InvalidPasswordException";
  }
}
