export interface IStorageProvider {
  getFile(fileKey: string): Promise<any>;
}
