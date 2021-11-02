import { inject, injectable } from "tsyringe";
import { IImportContactsDTO } from "../DTOs/IImportContactDTO";
import { IContactRepository } from "../infra/repositories/IContactRepository";
import ContactSchema from "../infra/entities/ContactSchema";
import { ICsvProvider } from "@/shared/container/providers/CsvProvider/models/ICsvProvider";

@injectable()
class ImportContactService {
  constructor(
    @inject("ContactRepository")
    private contactRepository: IContactRepository,

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

    const contactsAlreadyExists = await this.contactRepository.find({
      cellphone: { $in: contacts.map((contact) => contact.cellphone) },
    });

    if (contactsAlreadyExists.length) {
      const contactsAlreadyExistsCellphone = contactsAlreadyExists.map(
        (contact) => contact.cellphone
      );

      // remove contacts already exists
      contacts.forEach((contact) => {
        if (contactsAlreadyExistsCellphone.includes(contact.cellphone)) {
          contacts.splice(contacts.indexOf(contact), 1);
        }
      });
    }

    await this.contactRepository.saveMany(contacts);
  }
}

export { ImportContactService };
