import "reflect-metadata";
import "dotenv/config";
import "@shared/container";
import { connection } from "@/shared/utils/testHelpers/orm";
import { container } from "tsyringe";
import { ImportContactService } from "./ImportContactsService";
import { Readable } from "stream";
import { ContactRepository } from "../infra/repositories/ContactRepository";
import { classToPlain } from "class-transformer";

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

describe("[FUNCTIONAL] Import contacts list", () => {
  it("should be able to import new contacts", async () => {
    const importContactService = container.resolve(ImportContactService);
    const contactsRepository = container.resolve(ContactRepository);

    const contactsFileStream = Readable.from([
      "John Dee;+551234567890\n",
      "Jane Dee;+5511958865461\n",
    ]);

    await importContactService.execute({
      contactsFileStream,
    });

    const contacts = await contactsRepository.find();

    expect(classToPlain(contacts)).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: "John Dee",
          cellphone: "+551234567890",
        }),
        expect.objectContaining({
          name: "Jane Dee",
          cellphone: "+5511958865461",
        }),
      ])
    );
  });

  it("should ignore duplicate contacts in CSV", async () => {
    const importContactService = container.resolve(ImportContactService);
    const contactsRepository = container.resolve(ContactRepository);

    const contactsFileStream = Readable.from([
      "John Dee;+551234567890\n",
      "John Dee;+551234567890\n",
      "Jane Dee;+5511958865461\n",
    ]);

    await importContactService.execute({
      contactsFileStream,
    });

    const contacts = await contactsRepository.find();

    expect(contacts).toHaveLength(2);

    expect(classToPlain(contacts)).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: "John Dee",
          cellphone: "+551234567890",
        }),
        expect.objectContaining({
          name: "Jane Dee",
          cellphone: "+5511958865461",
        }),
      ])
    );
  });
});
