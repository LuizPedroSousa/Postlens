import { MessageAttributes, Message } from "../infra/entities/Message";

export interface ICreateMessageDTO {
  message: Omit<MessageAttributes<Message>, "user_id">;
  user_id: string;
}
