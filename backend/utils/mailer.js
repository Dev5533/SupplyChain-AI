const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS 
  }
});

const sendDigestEmail = async (email, subject, htmlContent) => {
  await transporter.sendMail({
    from: `"SupplyChain AI" <${process.env.MAIL_USER}>`,
    to: email,
    subject,
    html: htmlContent
  });
};



module.exports = sendDigestEmail;
