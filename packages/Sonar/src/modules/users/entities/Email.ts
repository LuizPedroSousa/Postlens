import { Either, left, right } from "@shared/domain/either";
import { InvalidEmailException } from "./exceptions/InvalidEmailException";

export class Email {
  public email: string;

  constructor(email: string) {
    this.email = email;
    Object.freeze(this);
  }

  static create(email: string): Either<InvalidEmailException, Email> {
    if (!Email.validate(email)) {
      return left(new InvalidEmailException(email));
    }

    return right(new Email(email));
  }

  private static validate(email: string): boolean {
    if (!email) {
      return false;
    }

    if (email.length > 256) {
      return false;
    }

    const especialCharactersRegex =
      /^[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;

    if (!especialCharactersRegex.test(email)) {
      return false;
    }

    const [recipient, domain] = email.split("@");

    if (recipient.length > 64) {
      return false;
    }

    const domainParts = domain.split(".");

    if (domainParts.some((part) => part.length > 63)) {
      return false;
    }

    return true;
  }
}
