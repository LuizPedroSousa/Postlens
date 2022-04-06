import { DomainException } from "./DomainException";

export class InvalidEmailException extends Error implements DomainException {
  constructor(email: string) {
    super(`Invalid email: ${email}`);

    this.name = "InvalidEmailException";
  }
}
