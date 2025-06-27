import "express-async-errors";
import "dotenv/config";
import "@/shared/infra/ORM";
import "reflect-metadata";
import "@shared/container";
import express, { Application } from "express";
import { createServer, Server as HTTPServer } from "http";
import cors from "cors";
import helmet from "helmet";
import { handleErrors } from "@/shared/middlewares/handleErrors";
import logger from "@utils/logger";
import { checkOrigin } from "@config/cors";
import { limiter } from "./config/ratelimit";

class App {
  public app: Application;
  public port: string | number;
  public server: HTTPServer;
  public address: string;
  constructor() {
    this.port = process.env.PORT || 3333;
    this.address = process.env.ADDRESS || "http://localhost";
    this.app = express();
    this.server = createServer(this.app);
    this.initializeMiddlewares();
    this.initializeErrorHandling();
  }

  public listen() {
    this.app.listen(this.port, () => {
      logger.success(`-🚀 Server Started in ${this.address}:${this.port}`);
    });
  }

  private initializeMiddlewares() {
    this.app.use(helmet());
    this.app.use(cors({ credentials: true, origin: checkOrigin }));
    this.app.use(express.json());
    this.app.use(limiter);
  }

  private initializeErrorHandling() {
    this.app.use(handleErrors);
  }
}

const app = new App();
export { app };
