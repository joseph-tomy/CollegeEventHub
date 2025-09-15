// Dummy mail service (you can connect nodemailer later)
export const sendMail = (to, subject, message) => {
  console.log(`📧 Sending mail to ${to} | Subject: ${subject}`);
  return true;
};
