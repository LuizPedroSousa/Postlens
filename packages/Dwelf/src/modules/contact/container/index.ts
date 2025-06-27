import { container } from "tsyringe";
import { ContactRepository } from "../infra/repositories/ContactRepository";
import { IContactRepository } from "../infra/repositories/IContactRepository";
import { CreateContactsService } from "../services/CreateContactsService";

container.registerSingleton<IContactRepository>(
  "ContactRepository",
  ContactRepository
);

container.registerSingleton<CreateContactsService>(
  "CreateContactsService",
  CreateContactsService
);
