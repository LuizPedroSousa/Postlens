export interface ISendMessageDTO {
  to: string;
  body: string;
  type: "whatsapp" | "sms";
}
