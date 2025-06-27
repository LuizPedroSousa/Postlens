import { Message } from "../schemas/Message";

export interface IMessageRepository {
  find(where?: object): Promise<Message[]>;
  findOne(where?: object): Promise<Message | undefined>;
  findById(message_id: string): Promise<Message | undefined>;
  save(message: Message): Promise<void>;
  delete(where?: object): Promise<void>;
}
