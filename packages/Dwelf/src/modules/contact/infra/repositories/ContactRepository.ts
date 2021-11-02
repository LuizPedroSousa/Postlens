import { assignDefined } from "@/shared/utils/assignDefined";
import { getMongoRepository, MongoRepository } from "typeorm";
import ContactSchema from "../entities/ContactSchema";
import { IContactRepository } from "./IContactRepository";

class ContactRepository implements IContactRepository {
  private ormRepository: MongoRepository<ContactSchema>;

  constructor() {
    this.ormRepository = getMongoRepository(ContactSchema, "default");
  }

  public async find(where?: object): Promise<ContactSchema[]> {
    return await this.ormRepository.find(assignDefined({ where }));
  }

  public async findOne(where?: object): Promise<ContactSchema | undefined> {
    return await this.ormRepository.findOne(assignDefined({ where }));
  }

  public async saveMany(contacts: ContactSchema[]): Promise<ContactSchema[]> {
    return await this.ormRepository.save(contacts);
  }

  public async save(contact: ContactSchema): Promise<ContactSchema> {
    return await this.ormRepository.save(contact);
  }

  public async delete(where?: object): Promise<void> {
    await this.ormRepository.delete(assignDefined(where));
  }
}

export { ContactRepository };
