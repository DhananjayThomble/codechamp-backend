const { Resend } = require("resend");
const dotenv = require("dotenv");
dotenv.config();
const resend = new Resend(process.env.RESEND_API_KEY);

const sendWelcomeMail = async (email, name) => {
  try {
    await resend.emails.send({
      from: "CodeChamp <codechamp@snapurl.in>",
      to: email,
      subject: "Welcome to CodeChamp",
      html: `<p>Hi ${name},</p> <p>Welcome to CodeChamp. We are excited to have you on board.</p>`,
    });
  } catch (error) {
    console.error("Error from send welcome mail utility", error);
  }
};

module.exports = sendWelcomeMail;
