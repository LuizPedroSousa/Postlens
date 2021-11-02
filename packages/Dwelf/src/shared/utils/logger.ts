import { Timestamp } from "@skyra/timestamp";
import chalk from "chalk";

type Log = (text: string, ...args: any) => void;

interface LoggerActions {
  info: Log;
  warn: Log;
  success: Log;
  error: Log;
}

class Logger implements LoggerActions {
  public info(text: string, ...args: any[]) {
    return console.log(
      chalk`{bgGray.white [${new Timestamp(
        "YYYY-MM-DD HH:mm:ss"
      )}]} {gray ${text}}`,
      ...args
    );
  }

  public warn(text: string, ...args: any[]) {
    return console.log(
      chalk`{bgYellow.gray [${new Timestamp(
        "YYYY-MM-DD HH:mm:ss"
      )}]} {yellow ${text}}`,
      ...args
    );
  }

  public success(text: string, ...args: any[]) {
    return console.log(
      chalk`{bgGreenBright.gray [${new Timestamp(
        "YYYY-MM-DD HH:mm:ss"
      )}]} {greenBright ${text}}`,
      ...args
    );
  }

  public error(text: string, ...args: any[]) {
    return console.log(
      chalk`{bgRed.white [${new Timestamp(
        "YYYY-MM-DD HH:mm:ss"
      )}]} {red ${text}}`,
      ...args
    );
  }
}

export default new Logger();
