import { BaseException } from "@shared/domain/BaseException";

export class InvalidUserException extends Error implements BaseException {
  constructor() {
    super("User credentials are invalid");
    this.name = "InvalidUserException";
  }
}
