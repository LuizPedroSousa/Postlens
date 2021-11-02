import { inject, injectable } from "tsyringe";
import { IImportContactsDTO } from "../DTOs/IImportContactDTO";
import { IContactRepository } from "../infra/repositories/IContactRepository";
import ContactSchema from "../infra/entities/ContactSchema";
import { ICsvProvider } from "@/shared/container/providers/CsvProvider/models/ICsvProvider";
import { CreateContactsService } from "./CreateContactsService";

@injectable()
class ImportContactService {
  constructor(
    @inject("ContactRepository")
    private contactRepository: IContactRepository,

    @inject("CreateContactsService")
    private createContactService: CreateContactsService,

    @inject("CsvProvider")
    private csvProvider: ICsvProvider
  ) {}

  async execute({ contactsFileStream }: IImportContactsDTO): Promise<void> {
    const contacts: ContactSchema[] = [];

    await this.csvProvider.parse(contactsFileStream, async (line) => {
      const [name, cellphone] = line;

      // push inexistent contact into array
      if (
        !contacts.find(
          (contact) => contact.cellphone === cellphone || contact.name === name
        )
      ) {
        const contact = new ContactSchema({ name, cellphone });
        contacts.push(contact);
      }
    });

    await this.createContactService.execute({ contacts });
  }
}

export { ImportContactService };
