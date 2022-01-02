import { Contact } from "../entities/Contact";

export interface IContactRepository {
  find(where?: object): Promise<Contact[]>;
  findOne(where?: object): Promise<Contact | undefined>;
  saveMany(contacts: Contact[]): Promise<Contact[]>;
  save(contact: Contact): Promise<Contact>;
  delete(where?: object): Promise<void>;
}
