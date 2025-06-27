import "reflect-metadata";
import "dotenv/config";
import "@shared/container";
import { Contact } from "../infra/entities/Contact";
import { container } from "tsyringe";
import { CreateContactsService } from "./CreateContactsService";
import { classToPlain } from "class-transformer";
import { connection } from "@/shared/utils/testHelpers/orm";
import { ContactRepository } from "../infra/repositories/ContactRepository";
import { buildContactData } from "@/shared/utils/testHelpers/fakes/contact";

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

describe("[FUNC] Create contacts", () => {
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
      new Contact({ name: "John Dee", cellphone: "+551234567890" }),
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
