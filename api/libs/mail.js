import mailgunFactory from 'mailgun-js';

const mailgun = mailgunFactory({
  apiKey: process.env.MAILGUN_API_KEY,
  domain: process.env.MAILGUN_DOMAIN,
});

export default async function sendMail(to, subject, html) {
  return new Promise((resolve) => {
    mailgun.messages().send({
      from: process.env.MAIL_FROM,
      to,
      subject,
      html,
    }).then(() => resolve()).catch(() => resolve());
  });
}
