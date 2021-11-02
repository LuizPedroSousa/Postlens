import { Request, Response, NextFunction } from "express";
import { CelebrateError, isCelebrateError } from "celebrate";
import { ValidationError, isError as isJoiError } from "joi";
import { assignDefined } from "@/shared/utils/assignDefined";
import { HTTPException } from "@exceptions/HTTPExceptions";
import logger from "../utils/logger";

interface ErrorResponse {
  status: string;
  message: string;
  errors: { [key: string]: string };
}

const handleErrors = (
  error: HTTPException | CelebrateError | ValidationError,
  req: Request,
  res: Response,
  _: NextFunction
) => {
  if (error instanceof HTTPException) {
    const response = assignDefined({
      status: error?.statusMessage,
      message: error?.message,
    });
    return res.status(error?.statusCode).json(response);
  }

  if (isCelebrateError(error)) {
    const result: ErrorResponse = {
      status: "error",
      message: "Validation error",
      errors: {},
    };

    error.details.forEach((err: any) => {
      const correctMessage = err.message.split('"')[2].trimStart();
      result.errors[err.context.key] = correctMessage;
    });

    return res.status(400).json(result);
  }

  if (isJoiError(error)) {
    const result: ErrorResponse = {
      status: "error",
      message: "Validation error",
      errors: {},
    };

    error.details.forEach((err) => {
      const correctMessage = err.message.split('"')[2].trimStart();
      result.errors[err.path as any] = correctMessage;
    });

    return res.status(400).json(result);
  }

  logger.error(error);
  return res
    .status(500)
    .json({ status: "error", message: "Internal server error" });
};

export { handleErrors };
