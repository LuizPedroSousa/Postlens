import { Contact } from "@/modules/contact/infra/entities/Contact";
import faker from "faker";

const buildContactData = () => {
  return new Contact({
    name: faker.internet.userName(),
    cellphone: faker.phone.phoneNumber(),
  });
};

export { buildContactData };
