import Queue from "bull";
import { IQueues } from "../models/IQueueProvider";

export type IQueueDTO = {
  // eslint-disable-next-line no-unused-vars
  [key in IQueues]: {
    execute: any;
    queue: Queue.Queue;
  };
};
