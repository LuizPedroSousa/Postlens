import { Either } from "@shared/domain/either";
import { Email } from "./Email";
import { InvalidEmailException } from "./exceptions/InvalidEmailException";
import { EmailBuilder } from "./builders/EmailBuilder";

describe("[UNIT] - [USERS] - Email domain entity", () => {
  it("should be able to return a Email, when email credential has valid", () => {
    const email = EmailBuilder.generate();

    const emailOrError: Either<InvalidEmailException, Email> =
      Email.create(email);

    expect(emailOrError.isLeft()).toBeFalsy();
    expect(emailOrError.isRight()).toBeTruthy();
    expect(emailOrError.value).toEqual({ value: email });
  });

  it("should give an InvalidEmailException, when email is blank", () => {
    const email = "";

    const emailOrError: Either<InvalidEmailException, Email> =
      Email.create(email);

    expect(emailOrError.isRight()).toBeFalsy();
    expect(emailOrError.value).toEqual(new InvalidEmailException(email));
  });

  it("should give an InvalidEmailException, when email is grater than 256", () => {
    const email = EmailBuilder.generateInvalid({
      recipientLength: 128,
      domainLength: 128,
    });

    const emailOrError: Either<InvalidEmailException, Email> =
      Email.create(email);

    expect(emailOrError.isRight()).toBeFalsy();

    expect(emailOrError.value).toEqual(new InvalidEmailException(email));
  });

  it("should give an InvalidEmailException, when email recipient is grater than 64 characters", () => {
    const email = EmailBuilder.generateInvalid({ recipientLength: 65 });

    const emailOrError: Either<InvalidEmailException, Email> =
      Email.create(email);

    expect(emailOrError.isRight()).toBeFalsy();
    expect(emailOrError.value).toEqual(new InvalidEmailException(email));
  });

  it("should give an InvalidEmailException, when email does't have an especial character", () => {
    const email = EmailBuilder.generateInvalid({ atSign: false });

    const emailOrError: Either<InvalidEmailException, Email> =
      Email.create(email);

    expect(emailOrError.isRight()).toBeFalsy();
    expect(emailOrError.value).toEqual(new InvalidEmailException(email));
  });

  it("should give an InvalidEmailException, when email domain parts is grater than 64 characters", () => {
    const email = EmailBuilder.generateInvalid({
      domainLength: 65,
    });

    const emailOrError: Either<InvalidEmailException, Email> =
      Email.create(email);

    expect(emailOrError.isRight()).toBeFalsy();
    expect(emailOrError.value).toEqual(new InvalidEmailException(email));
  });
});
