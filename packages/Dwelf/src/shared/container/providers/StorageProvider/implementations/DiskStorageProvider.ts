import fs from "fs";
import path from "path";
import { uploadConfig } from "@config/upload";
import { IStorageProvider } from "../models/IStorageProvider";
import { injectable } from "tsyringe";

@injectable()
class DiskStorageProvider implements IStorageProvider {
  async getFile(fileKey: string): Promise<Buffer> {
    const file = await fs.promises.readFile(
      path.resolve(uploadConfig.config.disk.uploadsFolder, fileKey)
    );

    return file;
  }
}

export { DiskStorageProvider };
