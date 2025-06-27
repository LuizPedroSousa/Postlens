import { inject, injectable } from "tsyringe";
import { IImportContactsDTO } from "../DTOs/IImportContactDTO";
import { Contact } from "../infra/entities/Contact";
import { ICsvProvider } from "@/shared/container/providers/CsvProvider/models/ICsvProvider";
import { CreateContactsService } from "./CreateContactsService";

@injectable()
class ImportContactService {
  constructor(
    @inject("CreateContactsService")
    private createContactService: CreateContactsService,

    @inject("CsvProvider")
    private csvProvider: ICsvProvider
  ) {}

  async execute({ contactsFileStream }: IImportContactsDTO): Promise<void> {
    const contacts: Contact[] = [];

    await this.csvProvider.parse(contactsFileStream, async (line) => {
      const [name, cellphone] = line;

      // push inexistent contact into array
      if (
        !contacts.find(
          (contact) => contact.cellphone === cellphone || contact.name === name
        )
      ) {
        const contact = new Contact({ name, cellphone });
        contacts.push(contact);
      }
    });

    await this.createContactService.execute({ contacts });
  }
}

export { ImportContactService };
