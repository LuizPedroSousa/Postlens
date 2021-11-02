import "reflect-metadata";
import "dotenv/config";
import "@shared/container";
import ContactSchema from "../infra/entities/ContactSchema";
import faker from "faker";
import { container } from "tsyringe";
import { CreateContactsService } from "./CreateContactsService";
import { classToPlain } from "class-transformer";
import { connection } from "@/shared/utils/testHelpers/orm";
import { ContactRepository } from "../infra/repositories/ContactRepository";

const buildContactData = () => {
  return new ContactSchema({
    name: faker.internet.userName(),
    cellphone: faker.phone.phoneNumber(),
  });
};

beforeAll(async () => {
  await connection.create();
});

beforeEach(async () => {
  const contactsRepository = container.resolve(ContactRepository);
  await contactsRepository.delete();
});

afterAll(async () => {
  await connection.close();
});

describe("Create contacts", () => {
  it("should be able to insert contacts into database", async () => {
    const data = [buildContactData(), buildContactData()];

    const createContactsService = container.resolve(CreateContactsService);
    const contactsRepository = container.resolve(ContactRepository);

    await createContactsService.execute({ contacts: data });

    const contacts = await contactsRepository.find();

    expect(contacts).toHaveLength(2);
    expect(classToPlain(contacts)).toEqual(expect.arrayContaining(data));
  });

  it("should not be able to import existent contacts in database", async () => {
    const data = [
      buildContactData(),
      new ContactSchema({ name: "John Dee", cellphone: "+551234567890" }),
    ];

    const createContactsService = container.resolve(CreateContactsService);
    const contactsRepository = container.resolve(ContactRepository);

    await contactsRepository.save(data[1]);

    await createContactsService.execute({ contacts: data });

    const contacts = await contactsRepository.find();

    expect(contacts).toHaveLength(2);
    expect(classToPlain(contacts)).toEqual(expect.arrayContaining(data));
  });
});
