import { DomainException } from "./DomainException";

export class InvalidCellphoneException
  extends Error
  implements DomainException
{
  constructor(cellphone: string) {
    super(`Invalid cellphone ${cellphone}`);
    this.name = "InvalidCellphoneException";
  }
}
