import { Contact } from "@/modules/contact/infra/entities/Contact";

const replaceMessage = (message: string, contact: Contact) => {
  const result = message
    .replace("{name}", contact.name)
    .replace("{cellphone}", contact.cellphone);
  return result;
};

export { replaceMessage };
