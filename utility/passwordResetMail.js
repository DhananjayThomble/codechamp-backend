// sending mail for resetting password

const { Resend } = require("resend");
const dotenv = require("dotenv");
dotenv.config();
const resend = new Resend(process.env.RESEND_API_KEY);

const sendPasswordResetMail = async (email, name, resetLink) => {
  try {
    await resend.emails.send({
      from: "CodeChamp < codechamp@snapurl.in >",
      to: email,
      subject: "Reset your password",
      html: `<p>Hi ${name},</p> <p>Click <a href="${resetLink}">here</a> to reset your password.</p> <br/>
        <p>This link is valid for 1 hour.</p> <br/>
      <p>If you didn't request a password reset, you can ignore this email.</p>`,
    });
  } catch (error) {
    console.error("Error from send password reset mail utility", error);
  }
};

module.exports = sendPasswordResetMail;
