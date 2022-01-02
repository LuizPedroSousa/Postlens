export type MailDrivers = "ses" | "mailhog";

type SesCredentials = {
  accessKeyId: string;
  secretAccessKey: string;
};

type MailHogCredentials = {
  host: string;
  port: number;
};

type Credentials = {
  ses: SesCredentials;
  mailhog: MailHogCredentials;
};

interface IMailConfig {
  driver: MailDrivers;
  credentials: Credentials;
  defaults: {
    from: {
      address: string;
      name: string;
    };
  };
}

const mailConfig: IMailConfig = {
  driver: (process.env.MAIL_DRIVER as MailDrivers) || "mailtrap",

  credentials: {
    ses: {
      accessKeyId: String(process.env.AWS_SES_ACCESS_KEY_ID),
      secretAccessKey: String(process.env.AWS_SES_SECRET_KEY),
    },
    mailhog: {
      host: "mailhog",
      port: Number(process.env.MAILHOG_PORT) || 1025,
    },
  },
  defaults: {
    from: {
      address: "noreply@messageAlive.com",
      name: "MessageAlive",
    },
  },
};

export { mailConfig };
