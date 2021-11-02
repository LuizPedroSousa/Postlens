import { Readable } from "stream";

export interface ICsvProvider {
  parse(csv: Readable, callback: (line: any[]) => Promise<void>): Promise<void>;
}
