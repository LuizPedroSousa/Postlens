import { Either, left, right } from "@shared/core/either";
import { InvalidPasswordException } from "./exceptions/InvalidPasswordException";

export class Password {
  private constructor(public password: string) {
    Object.freeze(this);
  }

  static create(password: string): Either<InvalidPasswordException, Password> {
    if (!Password.validate(password)) {
      return left(new InvalidPasswordException(password));
    }

    return right(new Password(password));
  }

  private static validate(password: string): boolean {
    /**
     * Minimum eight characters,
     * at least one uppercase letter,
     * one lowercase letter,
     * one number and one special character:
     **/
    const passwordRegexValidation =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!passwordRegexValidation.test(password)) {
      return false;
    }

    return true;
  }
}
