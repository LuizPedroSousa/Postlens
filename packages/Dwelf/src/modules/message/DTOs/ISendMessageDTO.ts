import { IParseMailTemplateDTO } from "@/shared/container/providers/MailTemplateProvider/DTOs/IParseMailTemplateDTO";
import { MessageType } from "../infra/entities/Message";

type Recipient = {
  name: string;
  address: string;
};

export interface ISendMessageDTO {
  to: Recipient;
  message: string;
  subject?: string;
  templateData?: IParseMailTemplateDTO;
  type: MessageType;
}
