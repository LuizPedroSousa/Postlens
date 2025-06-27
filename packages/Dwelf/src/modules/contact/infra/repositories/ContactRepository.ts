import { assignDefined } from "@/shared/utils/assignDefined";
import { getMongoRepository, MongoRepository } from "typeorm";
import { Contact } from "../entities/Contact";
import { IContactRepository } from "./IContactRepository";

class ContactRepository implements IContactRepository {
  private ormRepository: MongoRepository<Contact>;

  constructor() {
    this.ormRepository = getMongoRepository(Contact, "default");
  }

  public async find(where?: object): Promise<Contact[]> {
    return await this.ormRepository.find(assignDefined({ where }));
  }

  public async findOne(where?: object): Promise<Contact | undefined> {
    return await this.ormRepository.findOne(assignDefined({ where }));
  }

  public async saveMany(contacts: Contact[]): Promise<Contact[]> {
    return await this.ormRepository.save(contacts);
  }

  public async save(contact: Contact): Promise<Contact> {
    return await this.ormRepository.save(contact);
  }

  public async delete(where?: object): Promise<void> {
    await this.ormRepository.delete(assignDefined(where));
  }
}

export { ContactRepository };
