import sendMail from '../libs/mail.js';

export function sendForgotPasswordEmail(email, subject, name, token) {
  return sendMail(
    email,
    subject,
    `<div style="
      max-width: 600px;
      margin: 0 auto;
      font-family: Arial, Helvetica, sans-serif;
      border: 1px solid #ccc;
      padding: 25px;
      border-radius: 5px;
    ">
    <div><img src="https://avatars.slack-edge.com/2020-07-03/1219808541829_1ac8c2104b54c303fee0_88.png" alt="Logo" style="max-width: 200px;display: block;text-align: center;margin: -0 auto;"></div>
    <div><img src="https://image.freepik.com/free-vector/forgot-password-concept-illustration_114360-1095.jpg" style="max-width: 150px;display: block;margin: 30px auto 0;"></div>
    <h3 style="
        margin: 0 auto;
        display: block;
        margin: 50px auto 10px;
        font-size: 25px;
        text-align: center;
    ">Hi ${name}</h3>
    <p style="display: block;text-align: center;">You or someone else confirms that your account forgot the password at</p>
    <p style="display: block;text-align: center;"><a href="${process.env.FRONTEND_URL}">${process.env.FRONTEND_URL}</a></p>
    <p style="display: block;text-align: center;">- If it's not from you, please ignore this email.</p>
    <p style="display: block;text-align: center;">
      - If it is from you, click <a href="${process.env.FRONTEND_URL}/reset-password?&token=${token}">here</a> to reset your password.
    </p>
    </div>`);
}
