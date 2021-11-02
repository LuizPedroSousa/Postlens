import { MessageType } from "../infra/entities/MessageSchema";

export interface ISendMessageDTO {
  to: string;
  message: string;
  type: MessageType;
}
