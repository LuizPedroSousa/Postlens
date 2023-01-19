import { BaseException } from "@shared/domain/BaseException";

export class InvalidEmailException extends Error implements BaseException {
  constructor(email: string) {
    super(`Invalid email: ${email}`);

    this.name = "InvalidEmailException";
  }
}
