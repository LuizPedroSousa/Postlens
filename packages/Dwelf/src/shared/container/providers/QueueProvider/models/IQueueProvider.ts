export type IQueues = "sendMessages";

export interface IQueueProvider {
  close(key: IQueues): Promise<void>;
  addJob<T>(key: IQueues, payload: T): Promise<void>;
}

export interface IJobProvider {
  key: IQueues;
  execute: any;
}
