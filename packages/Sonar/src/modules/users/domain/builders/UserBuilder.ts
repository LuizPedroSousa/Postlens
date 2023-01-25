import { faker } from "@faker-js/faker";
import { CreateUserDTO } from "../dtos/CreateUserDTO";
import { CellphoneBuilder } from "../valueObjects/builders/CellphoneBuilder";
import { EmailBuilder } from "../valueObjects/builders/EmailBuilder";
import { PasswordBuilder } from "../valueObjects/builders/PasswordBuilder";

export class UserBuilder {
  static generate(data?: Partial<CreateUserDTO>): CreateUserDTO {
    return {
      avatar: data?.avatar || faker.internet.avatar(),
      cellphone: data?.cellphone || CellphoneBuilder.generate(),
      email: data?.email || EmailBuilder.generate(),
      name: data?.name || faker.internet.userName(),
      password: data?.password || PasswordBuilder.generate(),
      username: data?.username || faker.internet.userName(),
    };
  }
}
