import { Either, left, right } from "@shared/domain/either";
import { ValueObject } from "@shared/domain/ValueObject";
import { InvalidCellphoneException } from "./exceptions/InvalidCellphoneException";

export class Cellphone extends ValueObject {
  private constructor(public value: string) {
    super();
    Object.freeze(this);
  }

  static create(
    cellphone: string
  ): Either<InvalidCellphoneException, Cellphone> {
    if (!Cellphone.validate(cellphone)) {
      return left(new InvalidCellphoneException(cellphone));
    }

    return right(new Cellphone(cellphone));
  }

  private static validate(cellphone: string): boolean {
    /**
     * checks:
     * - cellphone is not empty
     * - DDD must start with 1, and have 2 digits
     * - cellphone must have 9 digits
     */
    const cellphoneRegex = /^([1-9]{2})9[1-9][0-9]{3}[0-9]{4}$/;

    if (!cellphoneRegex.test(cellphone)) {
      return false;
    }

    return true;
  }
}
