import { HTTPException, StatusMessage } from "./HTTPExceptions";
import faker from "faker";
import { classToPlain } from "class-transformer";

const buildHTTPExceptionProps = (): HTTPException => {
  const statusCodes = [
    200, 201, 202, 203, 204, 205, 206, 207, 208, 226, 300, 301, 302, 303, 304,
    305, 306, 307, 308, 400, 401, 402, 403, 404, 405, 406, 407, 408, 409, 410,
    411, 412, 413, 414, 415, 416, 417, 418, 421, 422, 423, 424, 426, 428, 429,
    431, 451, 500, 501, 502, 503, 504, 505, 506, 507, 508, 510, 511,
  ];

  const statusMessages: StatusMessage[] = ["error", "success", "warn"];

  return {
    message: faker.random.words(),
    name: faker.random.word(),
    statusCode: faker.random.arrayElement(statusCodes),
    statusMessage: faker.random.arrayElement(statusMessages),
  };
};

describe("[UNIT] HTTPExceptions", () => {
  it("should returns an error with custom props", () => {
    const props = buildHTTPExceptionProps();
    try {
      throw new HTTPException(props);
    } catch (error: any) {
      expect(error).toBeDefined();
      expect({ message: error.message, ...classToPlain(error) }).toEqual(
        expect.objectContaining(props)
      );
    }
  });

  it("should returns an error that contains default props, when just pass message", () => {
    const { message } = buildHTTPExceptionProps();

    try {
      throw new HTTPException({ message });
    } catch (error: any) {
      expect(error).toBeDefined();
      expect({ message: error.message, ...classToPlain(error) }).toEqual(
        expect.objectContaining({
          message,
          statusCode: 400,
          statusMessage: "error",
        })
      );
    }
  });
});
