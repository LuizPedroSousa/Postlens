import ContactSchema from "../entities/ContactSchema";

export interface IContactRepository {
  find(where?: object): Promise<ContactSchema[]>;
  findOne(where?: object): Promise<ContactSchema | undefined>;
  saveMany(contacts: ContactSchema[]): Promise<ContactSchema[]>;
  save(contact: ContactSchema): Promise<ContactSchema>;
  delete(where?: object): Promise<void>;
}
