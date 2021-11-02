import { cacheConfig } from "@/config/cache";
import { SendMessageService } from "@/modules/message/useCase/SendMessageService";
import Queue, { QueueOptions } from "bull";
import { container } from "tsyringe";
import { IQueueDTO } from "../DTOs/IQueueDTO";
import {
  IJobProvider,
  IQueueProvider,
  IQueues,
} from "../models/IQueueProvider";

class BullQueueProvider implements IQueueProvider {
  private queues: IQueueDTO = {} as IQueueDTO;

  private sendMessageService = container.resolve(SendMessageService);
  private jobs: IJobProvider[] = [this.sendMessageService];
  constructor() {
    this.init();
    this.processQueue();
  }

  private init(): void {
    this.jobs.forEach(({ key, execute }) => {
      this.createQueue(key, execute, {
        redis: {
          host: cacheConfig.config.redis.host,
          port: cacheConfig.config.redis.port,
          password: cacheConfig.config.redis.password,
        },
      });
    });
  }

  private createQueue(
    key: IQueues,
    execute: any,
    options?: QueueOptions
  ): void {
    this.queues[key] = {
      queue: new Queue(key, options),
      execute,
    };
  }

  private async processQueue() {
    await Promise.all(
      this.jobs.map((job) => {
        const { queue, execute } = this.queues[job.key];
        return queue.process(execute);
      })
    );
  }

  public async addJob<T>(key: IQueues, payload: T): Promise<any> {
    await this.queues[key].queue.add(key, payload);
  }

  public async close(key: IQueues): Promise<void> {
    await this.queues[key].queue.close();
  }
}
export { BullQueueProvider };
