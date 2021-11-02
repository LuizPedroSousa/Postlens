import { assignDefined } from "@/shared/utils/assignDefined";
import { getMongoRepository, MongoRepository } from "typeorm";
import { MessageSchema } from "../entities/MessageSchema";
import { IMessageRepository } from "./IMessageRepository";

class MessageRepository implements IMessageRepository {
  private ormRepository: MongoRepository<MessageSchema>;
  constructor() {
    this.ormRepository = getMongoRepository(MessageSchema);
  }

  public async find(where?: object): Promise<MessageSchema[]> {
    return this.ormRepository.find(assignDefined(where));
  }

  public async findById(
    message_id: string
  ): Promise<MessageSchema | undefined> {
    return this.ormRepository.findOne(message_id);
  }

  public async findOne(where?: object): Promise<MessageSchema | undefined> {
    return this.ormRepository.findOne(assignDefined({ where }));
  }

  public async save(message: MessageSchema): Promise<void> {
    await this.ormRepository.save(message);
  }

  public async delete(where?: object): Promise<void> {
    await this.ormRepository.delete(assignDefined(where));
  }
}

export { MessageRepository };
