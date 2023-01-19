import {faker} from "@faker-js/faker";
import { CreateInvalidEmailDTO } from "./dtos/CreateInvalidEmailDTO";

export class EmailFaker {
  public static create(): string {
    return faker.internet.email();
  }

  public static createInvalid({
    recipientLength = 4,
    domainLength = 4,
    atSign = true,
  }: CreateInvalidEmailDTO): string {
    const recipient = faker.random.alpha({ count: recipientLength });

    const domain = faker.random.alpha({ count: domainLength });

    const atSignString = atSign ? "@" : "";

    const email = EmailFaker.formatEmail(
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
