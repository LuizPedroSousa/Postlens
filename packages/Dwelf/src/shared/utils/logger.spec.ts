import { Timestamp } from "@skyra/timestamp";
import logger from "./logger";
import chalk from "chalk";
import faker from "faker";

const generateLoggerData = () => {
  const text = faker.random.words();
  const date = new Timestamp("YYYY-MM-DD HH:mm:ss");
  const args = faker.random.words();

  return { text, date, args };
};

beforeEach(() => {
  console.log = jest.fn();
});

describe("[UNIT] Logger", () => {
  it("should returns a gray log  info", () => {
    const { text, date } = generateLoggerData();
    logger.info(text);

    const expectedResponse = chalk`{bgGray.white [${date}]} {gray ${text}}`;

    expect(console.log).toHaveBeenCalledWith(expectedResponse);
  });

  it("should returns a yellow log when calls a warn", () => {
    const { text, date } = generateLoggerData();

    logger.warn(text);

    const expectedResponse = chalk`{bgYellow.gray [${date}]} {yellow ${text}}`;

    expect(console.log).toHaveBeenCalledWith(expectedResponse);
  });

  it("should returns a green log when calls a success", () => {
    const { text, date } = generateLoggerData();

    logger.success(text);

    const expectedResponse = chalk`{bgGreenBright.gray [${date}]} {greenBright ${text}}`;

    expect(console.log).toHaveBeenCalledWith(expectedResponse);
  });

  it("should returns a red log when calls an error", () => {
    const { text, date } = generateLoggerData();

    logger.error(text);

    const expectedResponse = chalk`{bgRed.white [${date}]} {red ${text}}`;

    expect(console.log).toHaveBeenCalledWith(expectedResponse);
  });
});
