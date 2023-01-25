import { UserBuilder } from "./builders/UserBuilder";
import { InvalidUserException } from "./exceptions/InvalidUserException";
import { User } from "./User";
import { CellphoneBuilder } from "./valueObjects/builders/CellphoneBuilder";
import { EmailBuilder } from "./valueObjects/builders/EmailBuilder";
import { PasswordBuilder } from "./valueObjects/builders/PasswordBuilder";
import { InvalidCellphoneException } from "./valueObjects/exceptions/InvalidCellphoneException";
import { InvalidEmailException } from "./valueObjects/exceptions/InvalidEmailException";
import { InvalidPasswordException } from "./valueObjects/exceptions/InvalidPasswordException";

describe("[UNIT] - [USERS] - User Entity", () => {
  it("should be able to create an user when credentials are valid", () => {
    const data = UserBuilder.generate();

    const userOrError = User.create(data);

    expect(userOrError.isLeft()).toBeFalsy();

    expect(userOrError.value).toEqual(expect.objectContaining(data));
  });

  it("should give an InvalidUserException when credentials is missing", () => {
    const userOrError = User.create({} as any);

    expect(userOrError.isRight()).toBeFalsy();
    expect(userOrError.value).toBeInstanceOf(InvalidUserException);
  });

  it("should give an InvalidEmailException when email is invalid", () => {
    const userOrError = User.create(
      UserBuilder.generate({ email: EmailBuilder.generateInvalid() })
    );

    expect(userOrError.isRight()).toBeFalsy();
    expect(userOrError.value).toBeInstanceOf(InvalidEmailException);
  });

  it("should give an InvalidPasswordException when password is invalid", () => {
    const userOrError = User.create(
      UserBuilder.generate({
        password: PasswordBuilder.generateInvalid({
          nonSpecialCharacter: true,
        }),
      })
    );

    expect(userOrError.isRight()).toBeFalsy();
    expect(userOrError.value).toBeInstanceOf(InvalidPasswordException);
  });

  it("should give an InvalidCellphoneException when cellphone is invalid", () => {
    const userOrError = User.create(
      UserBuilder.generate({ cellphone: CellphoneBuilder.generateInvalid() })
    );

    expect(userOrError.isRight()).toBeFalsy();
    expect(userOrError.value).toBeInstanceOf(InvalidCellphoneException);
  });
});
