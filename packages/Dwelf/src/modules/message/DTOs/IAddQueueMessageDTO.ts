import { Contact } from "@/modules/contact/infra/entities/Contact";

export interface IAddQueueMessageDTO {
  message_id: string;
  contacts: Contact[];
}
