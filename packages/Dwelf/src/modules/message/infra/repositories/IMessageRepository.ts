import { MessageSchema } from "../entities/MessageSchema";

export interface IMessageRepository {
  find(where?: object): Promise<MessageSchema[]>;
  findOne(where?: object): Promise<MessageSchema | undefined>;
  findById(message_id: string): Promise<MessageSchema | undefined>;
  save(message: MessageSchema): Promise<void>;
  delete(where?: object): Promise<void>;
}
