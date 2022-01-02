import { MessageType } from "@/modules/message/infra/schemas/Message";

export interface ISendMessageDTO {
  to: string;
  body: string;
  type: MessageType;
}
