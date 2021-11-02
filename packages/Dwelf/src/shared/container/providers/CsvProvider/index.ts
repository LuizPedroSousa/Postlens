import { container } from "tsyringe";
import { CsvParserCsvProvider } from "./implemenations/CsvParserCsvProvider";

container.registerSingleton("CsvProvider", CsvParserCsvProvider);
