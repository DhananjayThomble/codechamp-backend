const { Resend } = require("resend");
const dotenv = require("dotenv");
dotenv.config();
const resend = new Resend(process.env.RESEND_API_KEY);

// sending dev password reset mail for testing with token and reset link
const sendPasswordResetMailDev = async (email, name, token, resetLink) => {
  try {
    await resend.emails.send({
      from: "CodeChamp < codechamp@snapurl.in >",
      to: email,
      subject: "Reset your password",
      html: `<p>Hi ${name},</p> <p>Here is the Link <a href="${resetLink}">here</a> to reset your password.</p> <br/>
            <p>This link is valid for 1 hour.</p> <br/>
            <p> Copy the reset link in postman and send a PUT request to the update-password endpoint with the token and password in the request body. </p> <br/>
        <p> <h3>Token: </h3> ${token}</p>`,
    });
  } catch (error) {
    console.error("Error from send password reset mail utility", error);
  }
};

module.exports = sendPasswordResetMailDev;
