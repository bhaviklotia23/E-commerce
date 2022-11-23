const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    service: process.env.SMPT_SERVICE, // It will be service provider. For eg: Gmail
    auth: {
      user: process.env.SMPT_MAIL, // Email of sender
      pass: process.env.SMPT_PASSWORD // Password of sender
    }
  });

  const mailOptions = {
    from: process.env.SMPT_MAIL, // Password of sender
    to: options.email, // Email of receiver
    subject: options.subject, // Subject of email
    text: options.message // Message from sender
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
