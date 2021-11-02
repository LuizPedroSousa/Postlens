import ContactSchema from "@/modules/contact/infra/entities/ContactSchema";

export interface IAddQueueMessageDTO {
  message_id: string;
  contacts: ContactSchema[];
}
