import { ICsvProvider } from "../models/ICsvProvider";
import { parse } from "papaparse";

interface IStepParser {
  data: string[];
}

class PapaparseCsvProvider implements ICsvProvider {
  public async parse(
    csv: any,
    callback: (line: any[]) => Promise<void>
  ): Promise<void> {
    return new Promise((resolve) =>
      parse(csv, {
        delimiter: ";",
        async step({ data }: IStepParser) {
          if (data.length) {
            await callback(data);
          }
        },
        complete() {
          resolve();
        },
      })
    );
  }
}

export { PapaparseCsvProvider };
