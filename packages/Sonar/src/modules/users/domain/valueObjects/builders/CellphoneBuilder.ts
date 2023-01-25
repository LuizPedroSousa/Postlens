import { faker } from "@faker-js/faker";

export class CellphoneBuilder {
  public static generate(): string {
    return faker.phone.number("1#9########");
  }

  public static generateInvalid(): string {
    return faker.phone.number("0##########");
  }
}
