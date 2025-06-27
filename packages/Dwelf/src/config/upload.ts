import path from "path";
import multer, { StorageEngine } from "multer";
import crypto from "crypto";

export type UploadDrivers = "s3" | "disk";

type DiskConfig = {
  tmpFolder: string;
  uploadsFolder: string;
};

type S3Config = {
  bucket: string;
};

type Configs = {
  disk: DiskConfig;
  s3: S3Config;
};

interface IUploadConfig {
  driver: UploadDrivers;
  multer: {
    storage: StorageEngine;
  };
  config: Configs;
}

const tmpFolder = path.resolve(__dirname, "..", "..", "tmp");

const uploadConfig: IUploadConfig = {
  driver: (process.env.MAIL_DRIVER as UploadDrivers) || "disk",

  multer: {
    storage: multer.diskStorage({
      destination: tmpFolder,
      filename(_, file, callback) {
        const fileHashed = crypto.randomBytes(10).toString("hex");

        const originalname = `${file.originalname}`.replace(/\s/g, "_");

        const fileName = `${fileHashed}-${originalname}`;

        return callback(null, fileName);
      },
    }),
  },

  config: {
    disk: {
      tmpFolder,
      uploadsFolder: path.resolve(tmpFolder, "uploads"),
    },
    s3: {
      bucket: "s3.amazonaws.com",
    },
  },
};

export { uploadConfig };
