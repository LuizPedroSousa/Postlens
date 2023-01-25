import { Either, left, right } from "@shared/domain/either";
import { Entity } from "@shared/domain/Entity";
import { CreateUserDTO } from "./dtos/CreateUserDTO";
import { InvalidUserException } from "./exceptions/InvalidUserException";
import { Cellphone } from "./valueObjects/Cellphone";
import { Email } from "./valueObjects/Email";
import { InvalidCellphoneException } from "./valueObjects/exceptions/InvalidCellphoneException";
import { InvalidEmailException } from "./valueObjects/exceptions/InvalidEmailException";
import { InvalidPasswordException } from "./valueObjects/exceptions/InvalidPasswordException";
import { Password } from "./valueObjects/Password";

interface UserProps {
  name: string;
  username: string;
  avatar: string;
  email: Email;
  password: Password;
  cellphone: Cellphone;
}

export type CreateUserException =
  | InvalidEmailException
  | InvalidPasswordException
  | InvalidCellphoneException;

export class User extends Entity {
  name: string;
  username: string;
  avatar: string;
  private _password: Password;
  private _cellphone: Cellphone;
  private _email: Email;

  get password() {
    return this._password.value;
  }

  get cellphone() {
    return this._cellphone.value;
  }

  get email() {
    return this._email.value;
  }

  constructor({ email, cellphone, password, ...props }: UserProps) {
    super();

    this._cellphone = cellphone;
    this._email = email;
    this._password = password;

    Object.assign(this, props);
    Object.freeze(this);
  }

  static create(props: CreateUserDTO): Either<CreateUserException, User> {
    if (!User.isValid(props)) {
      return left(new InvalidUserException());
    }

    const emailOrError = Email.create(props.email);
    const cellphoneOrError = Cellphone.create(props.cellphone);
    const passwordOrError = Password.create(props.password);

    if (emailOrError.isLeft()) {
      return left(emailOrError.value);
    }

    if (passwordOrError.isLeft()) {
      return left(passwordOrError.value);
    }

    if (cellphoneOrError.isLeft()) {
      return left(cellphoneOrError.value);
    }

    return right(
      new User({
        ...props,
        email: emailOrError.value,
        password: passwordOrError.value,
        cellphone: cellphoneOrError.value,
      })
    );
  }

  static isValid(props: CreateUserDTO): boolean {
    if (
      !props ||
      !props.avatar ||
      !props.cellphone ||
      !props.username ||
      !props.name
    ) {
      return false;
    }

    return true;
  }
}
