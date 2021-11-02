import { validate } from "class-validator";
import { plainToClass } from "class-transformer";
import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
  ValidationError,
} from "@nestjs/common";

export class ValidationPipe implements PipeTransform {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToClass(metatype, value);
    const errors = await validate(object);

    if (errors.length) {
      const validationErrors = {};

      errors.forEach((error: ValidationError) => {
        const correctMessage = Object.values(error.constraints);
        validationErrors[error.property as any] = correctMessage;
      });

      throw new BadRequestException({
        status: "error",
        message: "Validation Error",
        errors: validationErrors,
      });
    }

    return value;
  }

  private toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}
