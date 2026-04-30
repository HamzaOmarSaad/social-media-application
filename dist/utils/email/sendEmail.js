"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmailService = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const transporter = nodemailer_1.default.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS,
    },
});
const sendEmailService = async ({ to, cc, subject, html, }) => {
    try {
        const info = await transporter.sendMail({
            from: `"social media app " <${process.env.EMAIL}>`,
            to,
            cc,
            subject,
            html,
        });
        console.log("email sent :%s", info.accepted);
        return info;
    }
    catch (error) {
        console.log("error is found : " + error);
        throw error;
    }
};
exports.sendEmailService = sendEmailService;
