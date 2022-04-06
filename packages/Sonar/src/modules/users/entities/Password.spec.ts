import { InvalidPasswordException } from "./exceptions/InvalidPasswordException";
import { Password } from "./Password";

describe("[UNIT] - [USERS] - Password entity", () => {
  it("should be able to return a Password entity, when password is valid", () => {
    const password = "@Jd12345";

    const passwordOrError = Password.create(password);

    expect(passwordOrError.isLeft()).toBeFalsy();
    expect(passwordOrError.value).toEqual({ password });
  });

  it("should be able to an InvalidPasswordException, when password is less than 8 characters", () => {
    const password = "@Jd1234";

    const passwordOrError = Password.create(password);

    expect(passwordOrError.isRight()).toBeFalsy();
    expect(passwordOrError.value).toEqual(
      new InvalidPasswordException(password)
    );
  });

  it("should be able to an InvalidPasswordException, when just have lower case characters", () => {
    const password = "@jd12345";

    const passwordOrError = Password.create(password);

    expect(passwordOrError.isRight()).toBeFalsy();
    expect(passwordOrError.value).toEqual(
      new InvalidPasswordException(password)
    );
  });

  it("should be able to an InvalidPasswordException, when password not have letters", () => {
    const password = "@1234567";

    const passwordOrError = Password.create(password);

    expect(passwordOrError.isRight()).toBeFalsy();
    expect(passwordOrError.value).toEqual(
      new InvalidPasswordException(password)
    );
  });

  it("should be able to an InvalidPasswordException, when password not have at last one special character", () => {
    const password = "12345678";

    const passwordOrError = Password.create(password);

    expect(passwordOrError.isRight()).toBeFalsy();
    expect(passwordOrError.value).toEqual(
      new InvalidPasswordException(password)
    );
  });
});
