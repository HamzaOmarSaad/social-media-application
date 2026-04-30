import EventEmitter from "events";
import { EventHandler } from "../Events/EventHandler";
import { sendEmailService } from "./sendEmail";

const EmailEmitter = new EventEmitter();

export const email = new EventHandler(EmailEmitter);

email.subscribe("confirm-Email", (to, cc, subject, html) => {
  sendEmailService({ to, cc, subject, html });
});
