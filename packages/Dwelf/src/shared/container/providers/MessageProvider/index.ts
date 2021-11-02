import { container } from "tsyringe";
import { TwilioProvider } from "./implemantions/TwlioProvider";
import { IMessageProvider } from "./models/IMessageProvider";

container.registerSingleton<IMessageProvider>(
  "MessageProvider",
  TwilioProvider
);
