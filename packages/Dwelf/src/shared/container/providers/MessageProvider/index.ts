import { container } from "tsyringe";
import { TwilioProvider } from "./implemantions/TwilioProvider";
import { IMessageProvider } from "./models/IMessageProvider";

container.registerSingleton<IMessageProvider>(
  "MessageProvider",
  TwilioProvider
);
