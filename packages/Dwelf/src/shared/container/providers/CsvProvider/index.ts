import { container } from "tsyringe";
import { PapaparseCsvProvider } from "./implemenations/PapaparseCsvProvider";

container.registerSingleton("CsvProvider", PapaparseCsvProvider);
