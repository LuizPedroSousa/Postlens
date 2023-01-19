import { BaseException } from "../../../../shared/domain/BaseException";

export class InvalidCellphoneException extends Error implements BaseException {
  constructor(cellphone: string) {
    super(`Invalid cellphone ${cellphone}`);
    this.name = "InvalidCellphoneException";
  }
}
