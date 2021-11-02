import { Twilio } from "twilio";
import {
  MessageInstance,
  MessageListInstance,
} from "twilio/lib/rest/api/v2010/account/message";

const create = jest.fn().mockImplementation(() => {
  return {
    status: jest.fn().mockImplementation(() => {
      return {
        toJSON: jest.fn().mockImplementation(() => {
          return {
            sid: "messageSid",
          };
        }),
      };
    }),
  };
});

const mockedTwilio = new Twilio("mocked-sid", "mocked-auth");

const MockedTwilio = Twilio as jest.Mock<Twilio>;

MockedTwilio.mockImplementation(() => mockedTwilio);

const smsMessageResultMock: Partial<MessageInstance> = {
  status: "sent",
  sid: "AC-lorem-ipsum",
  errorCode: undefined,
  errorMessage: undefined,
};

const message: Partial<MessageListInstance> = {
  create: jest.fn().mockResolvedValue({ ...smsMessageResultMock }),
};

mockedTwilio.messages = message as MessageListInstance;
mockedTwilio.messages.create = create;

export default { create };
