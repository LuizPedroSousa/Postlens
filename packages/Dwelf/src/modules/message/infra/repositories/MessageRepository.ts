import { assignDefined } from "@/shared/utils/assignDefined";
import { getMongoRepository, MongoRepository } from "typeorm";
import { Message } from "../entities/Message";
import { IMessageRepository } from "./IMessageRepository";

class MessageRepository implements IMessageRepository {
  private ormRepository: MongoRepository<Message>;
  constructor() {
    this.ormRepository = getMongoRepository(Message);
  }

  public async find(where?: object): Promise<Message[]> {
    return this.ormRepository.find(assignDefined(where));
  }

  public async findById(message_id: string): Promise<Message | undefined> {
    return this.ormRepository.findOne(message_id);
  }

  public async findOne(where?: object): Promise<Message | undefined> {
    return this.ormRepository.findOne(assignDefined({ where }));
  }

  public async save(message: Message): Promise<void> {
    await this.ormRepository.save(message);
  }

  public async delete(where?: object): Promise<void> {
    await this.ormRepository.delete(assignDefined(where));
  }
}

export { MessageRepository };
