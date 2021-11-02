import faker from "faker";
import { assignDefined } from "./assignDefined";
describe("[UNIT] assignDefined", () => {
  it("should returns a new object without undefined, empty or null fields", () => {
    const data = {
      name: faker.internet.userName(),
      email: "",
      password: undefined,
      cep: null,
    };

    const formattedData = assignDefined(data);

    expect(formattedData).toEqual({ name: data.name });
    expect(formattedData).not.toEqual(data);
  });

  it("should returns an empty object when receive undefined or null", () => {
    const data: null | undefined = null;

    const formattedData = assignDefined(data);

    expect(formattedData).toEqual({});
    expect(formattedData).not.toEqual(data);
  });
});
