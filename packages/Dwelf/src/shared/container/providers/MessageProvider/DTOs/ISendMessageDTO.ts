import { MessageType } from "@/modules/message/infra/entities/MessageSchema";

export interface ISendMessageDTO {
  to: string;
  body: string;
  type: MessageType;
}
