import { container } from "tsyringe";
import { ContactRepository } from "../infra/repositories/ContactRepository";
import { IContactRepository } from "../infra/repositories/IContactRepository";

container.registerSingleton<IContactRepository>(
  "ContactRepository",
  ContactRepository
);
