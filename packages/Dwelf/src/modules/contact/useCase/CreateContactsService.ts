import { inject, injectable } from "tsyringe";
import { ICreateContactsDTO } from "../DTOs/ICreateContactsDTO";
import { ContactRepository } from "../infra/repositories/ContactRepository";

@injectable()
class CreateContactsService {
  constructor(
    @inject("ContactRepository")
    private contactRepository: ContactRepository
  ) {}

  async execute({ contacts }: ICreateContactsDTO) {
    const contactsAlreadyExists = await this.contactRepository.find({
      cellphone: { $in: contacts.map((contact) => contact.cellphone) },
    });

    if (contactsAlreadyExists.length) {
      const contactsAlreadyExistsCellphone = contactsAlreadyExists.map(
        (contact) => contact.cellphone
      );

      // remove contacts that already exists
      contacts.forEach((contact) => {
        if (contactsAlreadyExistsCellphone.includes(contact.cellphone)) {
          contacts.splice(contacts.indexOf(contact), 1);
        }
      });
    }

    await this.contactRepository.saveMany(contacts);
  }
}

export { CreateContactsService };
