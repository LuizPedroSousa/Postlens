import { UploadDrivers } from "@/config/upload";
import { container } from "tsyringe";
import { DiskStorageProvider } from "./implementations/DiskStorageProvider";
import { S3StorageProvider } from "./implementations/S3StorageProvider";
import { IStorageProvider } from "./models/IStorageProvider";

type Providers = {
  // eslint-disable-next-line no-unused-vars
  [key in UploadDrivers]: any;
};

const providers: Providers = {
  disk: DiskStorageProvider,
  s3: S3StorageProvider,
};

container.registerSingleton<IStorageProvider>(
  "StorageProvider",
  providers[(process.env.STORAGE_DRIVER as UploadDrivers) || "disk"]
);
