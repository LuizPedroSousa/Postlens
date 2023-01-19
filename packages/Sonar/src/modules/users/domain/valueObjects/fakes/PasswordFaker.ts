import { faker } from "@faker-js/faker";
import { CreatePasswordDTO } from "./dtos/CreatePasswordDTO";

export class PasswordFaker {
  static create(props?: CreatePasswordDTO): string {
    const result = faker.internet.password(
      props?.length || 9,
      false,
      props?.onlyNumbers ? /[0-9]/ : /[a-zA-Z0-9]/,
      !props?.nonSpecialCharacter && !props?.onlyNumbers ? "@2n" : ""
    );

    return props?.lowerCase ? result.toLowerCase() : result;
  }
}
