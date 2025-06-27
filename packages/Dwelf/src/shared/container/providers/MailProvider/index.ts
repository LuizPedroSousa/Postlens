import { MailDrivers } from "@/config/mail";
import { container } from "tsyringe";
import { MailHogMailProvider } from "./implementations/MailHogMailProvider";
import { SESMailProvider } from "./implementations/SESMailProvider";
import { IMailProvider } from "./models/IMailProvider";

type Providers = {
  // eslint-disable-next-line no-unused-vars
  [key in MailDrivers]: any;
};

const providers: Providers = {
  mailhog: MailHogMailProvider,
  ses: SESMailProvider,
};

container.registerSingleton<IMailProvider>(
  "MailProvider",
  providers[(process.env.MAIL_DRIVER as MailDrivers) || "mailhog"]
);
