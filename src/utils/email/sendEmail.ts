import nodemailer from "nodemailer";
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendEmailService = async ({
  to,
  cc,
  subject,
  html,
}: {
  to: string;
  cc: string;
  subject: string;
  html: string;
}) => {
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
  } catch (error) {
    console.log("error is found : " + error);
    throw error;
  }
};
