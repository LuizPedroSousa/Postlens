import { assignDefined } from "@utils/assignDefined";

export type StatusMessage = "error" | "warn" | "success";

interface HTTPExceptionProps {
  message: string;
  statusCode?: number;
  statusMessage?: StatusMessage;
}

export class HTTPException extends Error {
  public readonly statusCode: number = 400;
  public readonly statusMessage: StatusMessage = "error";
  public readonly message: string;
  constructor(props: HTTPExceptionProps) {
    super(props.message);
    Object.assign(this, assignDefined(props));
  }
}
