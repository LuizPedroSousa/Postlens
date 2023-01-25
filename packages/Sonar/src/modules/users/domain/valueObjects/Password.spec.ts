import { PasswordBuilder } from "./builders/PasswordBuilder";
import { InvalidPasswordException } from "./exceptions/InvalidPasswordException";
import { Password } from "./Password";

describe("[UNIT] - [USERS] - Password entity", () => {
  it("should be able to create a Password value object, when password is valid", () => {
    const password = PasswordBuilder.generate();

    const passwordOrError = Password.create(password);

    expect(passwordOrError.isLeft()).toBeFalsy();
    expect(passwordOrError.value).toEqual({ value: password });
  });

  it("should be able to an InvalidPasswordException, when password is less than 8 characters", () => {
    const password = PasswordBuilder.generateInvalid({ length: 6 });

    const passwordOrError = Password.create(password);

    expect(passwordOrError.isRight()).toBeFalsy();
    expect(passwordOrError.value).toEqual(
      new InvalidPasswordException(password)
    );
  });

  it("should be able to an InvalidPasswordException, when just have lower case characters", () => {
    const password = PasswordBuilder.generateInvalid({
      length: 6,
      lowerCase: true,
    });

    const passwordOrError = Password.create(password);

    expect(passwordOrError.isRight()).toBeFalsy();
    expect(passwordOrError.value).toEqual(
      new InvalidPasswordException(password)
    );
  });

  it("should be able to an InvalidPasswordException, when password not have letters", () => {
    const password = PasswordBuilder.generateInvalid({ onlyNumbers: true });

    const passwordOrError = Password.create(password);

    expect(passwordOrError.isRight()).toBeFalsy();
    expect(passwordOrError.value).toEqual(
      new InvalidPasswordException(password)
    );
  });

  it("should be able to an InvalidPasswordException, when password not have at last one special character", () => {
    const password = PasswordBuilder.generateInvalid({
      nonSpecialCharacter: true,
    });

    const passwordOrError = Password.create(password);

    expect(passwordOrError.isRight()).toBeFalsy();
    expect(passwordOrError.value).toEqual(
      new InvalidPasswordException(password)
    );
  });
});
