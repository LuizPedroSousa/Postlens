import { replaceMessage } from "./replaceMessage";
import { buildContactData } from "./testHelpers/fakes/contact";
import faker from "faker";

describe("[UNIT] replaceMessage", () => {
  it("should replace message template with contact props", () => {
    const data = buildContactData();

    const message =
      "Olá {name}, este numero de telefone: {cellphone}, é seu correto?";

    const messageExpected = `Olá ${data.name}, este numero de telefone: ${data.cellphone}, é seu correto?`;

    expect(replaceMessage(message, data)).toBe(messageExpected);
  });

  it("should not replace inexistent templates", () => {
    const data = buildContactData();

    const message = faker.random.words();

    expect(replaceMessage(message, data)).toBe(message);
  });
});
