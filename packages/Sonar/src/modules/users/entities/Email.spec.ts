import { Either } from "@shared/core/either";
import { Email } from "./Email";
import { InvalidEmailException } from "./exceptions/InvalidEmailException";
import faker from "@faker-js/faker";

interface CreateInvalidEmailDTO {
  recipientLength?: number;
  domainLength?: number;
  atSign?: boolean;
}

class EmailFaker {
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

describe("[UNIT] - [USERS] - Email domain entity", () => {
  it("should be able to return a Email, when email credential has valid", () => {
    const email = EmailFaker.create();

    const emailOrError: Either<InvalidEmailException, Email> =
      Email.create(email);

    expect(emailOrError.isLeft()).toBeFalsy();
    expect(emailOrError.isRight()).toBeTruthy();
    expect(emailOrError.value).toEqual({ email });
  });

  it("should give an InvalidEmailException, when email is blank", () => {
    const email = "";

    const emailOrError: Either<InvalidEmailException, Email> =
      Email.create(email);

    expect(emailOrError.isRight()).toBeFalsy();
    expect(emailOrError.value).toEqual(new InvalidEmailException(email));
  });

  it("should give an InvalidEmailException, when email is grater than 256", () => {
    const email = EmailFaker.createInvalid({
      recipientLength: 128,
      domainLength: 128,
    });

    const emailOrError: Either<InvalidEmailException, Email> =
      Email.create(email);

    expect(emailOrError.isRight()).toBeFalsy();

    expect(emailOrError.value).toEqual(new InvalidEmailException(email));
  });

  it("should give an InvalidEmailException, when email recipient is grater than 64 characters", () => {
    const email = EmailFaker.createInvalid({ recipientLength: 65 });

    const emailOrError: Either<InvalidEmailException, Email> =
      Email.create(email);

    expect(emailOrError.isRight()).toBeFalsy();
    expect(emailOrError.value).toEqual(new InvalidEmailException(email));
  });

  it("should give an InvalidEmailException, when email does't have an especial character", () => {
    const email = EmailFaker.createInvalid({ atSign: false });

    const emailOrError: Either<InvalidEmailException, Email> =
      Email.create(email);

    expect(emailOrError.isRight()).toBeFalsy();
    expect(emailOrError.value).toEqual(new InvalidEmailException(email));
  });

  it("should give an InvalidEmailException, when email domain parts is grater than 64 characters", () => {
    const email = EmailFaker.createInvalid({
      domainLength: 65,
    });

    const emailOrError: Either<InvalidEmailException, Email> =
      Email.create(email);

    expect(emailOrError.isRight()).toBeFalsy();
    expect(emailOrError.value).toEqual(new InvalidEmailException(email));
  });
});
