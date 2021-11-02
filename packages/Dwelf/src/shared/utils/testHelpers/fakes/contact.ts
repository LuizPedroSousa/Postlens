import ContactSchema from "@/modules/contact/infra/entities/ContactSchema";
import faker from "faker";

const buildContactData = () => {
  return new ContactSchema({
    name: faker.internet.userName(),
    cellphone: faker.phone.phoneNumber(),
  });
};

export { buildContactData };
