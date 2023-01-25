import { faker } from "@faker-js/faker";
import { GenerateInvalidEmailDTO } from "./dtos/GenerateInvalidEmailDTO";

export class EmailBuilder {
  public static generate(): string {
    return faker.internet.email();
  }

  public static generateInvalid(props?: GenerateInvalidEmailDTO): string {
    const recipient = faker.random.alpha({
      count: props?.recipientLength || 4,
    });

    const domain = faker.random.alpha({ count: props?.domainLength || 4 });

    const atSignString = props?.atSign ? "@" : "";

    const email = EmailBuilder.formatEmail(
      `${recipient}${atSignString}${domain}.com`
    );

    return email;
  }

  private static formatEmail(email: string): string {
    let result = email;

    const removeBlankSpaces = (value: string): string =>
      value.replace(/\s/gi, "");

    result = removeBlankSpaces(result);

    return result;
  }
}
