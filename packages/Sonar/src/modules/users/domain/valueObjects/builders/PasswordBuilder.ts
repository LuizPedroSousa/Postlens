import { faker } from "@faker-js/faker";
import { GeneratePasswordDTO } from "./dtos/GeneratePasswordDTO";

export class PasswordBuilder {
  static generate(props?: GeneratePasswordDTO): string {
    const result = faker.internet.password(
      props?.length || 9,
      false,
      props?.onlyNumbers ? /[0-9]/ : /[a-zA-Z0-9]/,
      !props?.nonSpecialCharacter && !props?.onlyNumbers ? "@2n" : ""
    );

    return props?.lowerCase ? result.toLowerCase() : result;
  }
}
