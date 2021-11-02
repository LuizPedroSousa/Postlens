import {
  MessageAttributes,
  MessageSchema,
} from "../infra/entities/MessageSchema";

export interface ICreateMessageDTO {
  message: Omit<MessageAttributes<MessageSchema>, "user_id">;
  user_id: string;
}
