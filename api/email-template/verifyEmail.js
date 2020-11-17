import sendMail from '~/libs/mail';

export function sendMailToVerifyEmail({ email, subject, name, token }) {
  return sendMail(
    email,
    subject,
    `<div style="
    max-width: 500px;
    margin: 0 auto;
    font-family: Lucida Sans Unicode, Lucida Grande, sans-serif;
    border: 1px solid #ccc;
    padding: 25px 70px;
    border-radius: 5px;
  ">
    <div><img src="https://photo-1-baomoi.zadn.vn/w1000_r1/2020_05_04_105_34923369/88666b120451ed0fb440.jpg" alt="Logo" style="max-width: 200px;display: block;text-align: center;margin: -0 auto;"></div>
    <h3 style="
        margin: 0 auto;
        display: block;
        margin: 50px auto 10px;
        font-size: 20px;
        word-wrap: break-word;
    ">Hi ${name}!</h3>
    <p style="display: block;text-align: left;font-size: 14px;word-wrap: break-word;">Someone took your account to become a customer on our website. Please press the button below to confirm.</p>
    <p style="display: block;text-align: center;word-wrap: break-word;">
      <a href="${process.env.FRONTEND_URL}/verify-email?token=${token}" style="text-decoration: none;word-wrap: break-word;
        padding: 14px 40px;
        background: #25C38C;
        color: #fff;
        display: inline-block;
        text-align: center;">Verify your email</a>
    </p>
    <p style="display: block;text-align: left;font-size: 14px;margin-top: 20px;word-wrap: break-word;">Or verify using this link: <a href="${process.env.FRONTEND_URL}/verify-email?token=${token}">${process.env.FRONTEND_URL}/verify-email?token=${token}</a></p>
    <p style="display: block;text-align: left;font-size: 14px;margin-top: 20px;word-wrap: break-word;">If you do not take any action on our website, please ignore this message.</p>
    <p style="display: block;text-align: left;font-size: 14px;margin-top: 20px;">Thank you!</p>
  </div>`,
  );
}
