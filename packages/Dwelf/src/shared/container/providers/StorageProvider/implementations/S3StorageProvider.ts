import { injectable } from "tsyringe";
import { IStorageProvider } from "../models/IStorageProvider";
import AWS from "aws-sdk";
import { uploadConfig } from "@/config/upload";

@injectable()
export class S3StorageProvider implements IStorageProvider {
  private client: AWS.S3;

  constructor() {
    this.client = new AWS.S3({
      region: "us-east-1",
    });
  }

  public async getFile(fileKey: string): Promise<any> {
    return await this.client
      .getObject({ Bucket: uploadConfig.config.s3.bucket, Key: fileKey })
      .promise();
  }
}
