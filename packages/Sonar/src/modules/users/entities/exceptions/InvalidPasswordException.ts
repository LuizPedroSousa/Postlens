import { DomainException } from "./DomainException";

export class InvalidPasswordException extends Error implements DomainException {
  constructor(password: string) {
    super(`Password ${password} is invalid`);
    this.name = "InvalidPasswordException";
  }
}
