const nodemailer = require('nodemailer');
const { gmail, password } = require('../../config/index');
const Mustache = require('mustache');
const fs = require('fs');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: gmail,
    pass: password,
  },
});

const otpMail = async (email, data) => {
  try {
    let template = fs.readFileSync('app/views/email/otp.html', 'utf-8');

    let message = {
      from: gmail,
      to: email,
      subject: 'OTP for registration is : ',
      html: Mustache.render(template, data),
    };

    return await transporter.sendMail(message);
  } catch (ex) {
    console.log(ex);
  }
};

// const invoiceMail = async (email, data) => {
//   try {
//     let template = fs.readFileSync('app/views/email/invoice.html', 'utf-8');

//     let message = {
//       from: gmail,
//       to: email,
//       subject: 'Invoice semina payment',
//       html: Mustache.render(template, data),
//     };

//     return await transporter.sendMail(message);
//   } catch (err) {
//     console.log(err);
//   }
// };

module.exports = { otpMail };
