import ContactSchema from "@/modules/contact/infra/entities/ContactSchema";

const replaceMessage = (message: string, contact: ContactSchema) => {
  const result = message
    .replace("{name}", contact.name)
    .replace("{cellphone}", contact.cellphone);
  return result;
};

export { replaceMessage };
