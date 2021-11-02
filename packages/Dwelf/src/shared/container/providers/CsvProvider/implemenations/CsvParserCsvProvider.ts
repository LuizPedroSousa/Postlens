import { Readable } from "stream";
import { ICsvProvider } from "../models/ICsvProvider";
import csvParse, { Parser } from "csv-parse";

class CsvParserCsvProvider implements ICsvProvider {
  private parsers: Parser;
  constructor() {
    this.parsers = csvParse({
      delimiter: ";",
    });
  }

  public async parse(
    csv: Readable,
    callback: (line: any[]) => Promise<void>
  ): Promise<void> {
    const parseCsv = csv.pipe(this.parsers);

    parseCsv.on("data", callback);

    await new Promise((resolve) => parseCsv.on("end", resolve));
  }
}

export { CsvParserCsvProvider };
