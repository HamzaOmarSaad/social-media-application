"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.email = void 0;
const events_1 = __importDefault(require("events"));
const EventHandler_1 = require("../Events/EventHandler");
const sendEmail_1 = require("./sendEmail");
const EmailEmitter = new events_1.default();
exports.email = new EventHandler_1.EventHandler(EmailEmitter);
exports.email.subscribe("confirm-Email", (to, cc, subject, html) => {
    (0, sendEmail_1.sendEmailService)({ to, cc, subject, html });
});
