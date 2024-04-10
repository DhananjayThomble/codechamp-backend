// send mail to the user for notifying course enrollment

const { Resend } = require("resend");
const dotenv = require("dotenv");
dotenv.config();
const resend = new Resend(process.env.RESEND_API_KEY);

const sendCourseEnrollNotifyMail = async (email, name, course) => {
  try {
    await resend.emails.send({
      from: "CodeChamp < codechamp@snapurl.in>",
      to: email,
      subject: "Course Enrollment",
      html: `<p>Hi ${name},</p> <p>You have successfully enrolled in the course ${course}.</p>`,
    });
  } catch (error) {
    console.error("Error from send course enroll notify mail utility", error);
  }
};

module.exports = sendCourseEnrollNotifyMail;
