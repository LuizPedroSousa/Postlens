import { Transport, MicroserviceOptions } from "@nestjs/microservices";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "./shared/pipes/validation.pipe";

async function bootstrap() {
  const port = process.env.PORT || 8282;
  const app = await NestFactory.create(AppModule, { cors: true });
  app.connectMicroservice({
    name: "KAFKA_SERVICE",
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: ["kafka:9092"],
      },
      consumer: {
        groupId: "message-alive-response",
      },
    },
  });

  app.startAllMicroservices();
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(port);
}

bootstrap();
