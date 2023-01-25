import { faker } from "@faker-js/faker";
import { GenerateInvalidPasswordDTO } from "./dtos/GenerateInvalidPasswordDTO";

export class PasswordBuilder {
  static generate(): string {
    const result = faker.internet.password(9, false, /[a-zA-Z0-9]/, "@2Na");

    return result;
  }

  static generateInvalid(props?: GenerateInvalidPasswordDTO): string {
    const password = faker.internet.password(
      props?.length || 8,
      false,
      props?.onlyNumbers ? /[0-9]/ : /[a-zA-Z0-9]/,
      !props?.nonSpecialCharacter && !props?.onlyNumbers ? "@2n" : ""
    );

    return props?.lowerCase ? password.toLowerCase() : password;
  }
}
