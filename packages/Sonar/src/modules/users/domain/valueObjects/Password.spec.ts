import { InvalidPasswordException } from "./exceptions/InvalidPasswordException";
import { PasswordFaker } from "./fakes/PasswordFaker";
import { Password } from "./Password";

describe("[UNIT] - [USERS] - Password entity", () => {
  it("should be able to return a Password entity, when password is valid", () => {
    const password = PasswordFaker.create();

    const passwordOrError = Password.create(password);

    expect(passwordOrError.isLeft()).toBeFalsy();
    expect(passwordOrError.value).toEqual({ value: password });
  });

  it("should be able to an InvalidPasswordException, when password is less than 8 characters", () => {
    const password = PasswordFaker.create({ length: 6 });

    const passwordOrError = Password.create(password);

    expect(passwordOrError.isRight()).toBeFalsy();
    expect(passwordOrError.value).toEqual(
      new InvalidPasswordException(password)
    );
  });

  it("should be able to an InvalidPasswordException, when just have lower case characters", () => {
    const password = PasswordFaker.create({ length: 6, lowerCase: true });

    const passwordOrError = Password.create(password);

    expect(passwordOrError.isRight()).toBeFalsy();
    expect(passwordOrError.value).toEqual(
      new InvalidPasswordException(password)
    );
  });

  it("should be able to an InvalidPasswordException, when password not have letters", () => {
    const password = PasswordFaker.create({ onlyNumbers: true });

    const passwordOrError = Password.create(password);

    expect(passwordOrError.isRight()).toBeFalsy();
    expect(passwordOrError.value).toEqual(
      new InvalidPasswordException(password)
    );
  });

  it("should be able to an InvalidPasswordException, when password not have at last one special character", () => {
    const password = PasswordFaker.create({ nonSpecialCharacter: true });

    const passwordOrError = Password.create(password);

    expect(passwordOrError.isRight()).toBeFalsy();
    expect(passwordOrError.value).toEqual(
      new InvalidPasswordException(password)
    );
  });
});
