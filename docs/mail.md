# [:envelope: Email](https://github.com/JSLancerTeam/saasgear/docs/mail.md)
Send email is an important feature in every SaaS. Send email feature in SaaSgear is powered by MailGun and MJML.

## Create email templates with MJML

MJML is a reponsive email template framework. It's React-like syntax and components helps us create a reponsive email template in few minutes. MJML template will be compiled to HTML before sending to customers.

You can create a MJML template file in ./api/email-templates folder.

This is an example email template:

```jsx
<mjml>
  <mj-body background-color="#f1f1f1">
    <mj-section>
      <mj-column>
        <mj-image
          width="100px"
          src="https://jslancer.com/assets/images/logo/jslancer.png"
        ></mj-image>
      </mj-column>
    </mj-section>
    <mj-section background-color="#fff">
      <mj-column>
        <mj-text font-size="30px" align="center">
          Your password has been changed
        </mj-text>
        <mj-divider border-color="#06adef" width="100px"></mj-divider>
        <mj-text font-size="18px" align="left" color="#555" line-height="30px">
          Hi {{name}}! Your password on SaaSgear has been changed on {{date}}.
          If you didn't initialize this change, please check your account on SaaSgear again.
        </mj-text>
      </mj-column>
    </mj-section>
  </mj-body>
</mjml>
```

## Send email with Mailgun

In order to send an email with Mailgun and MJML, you need to compile the email with helper function and then use Mailgun API to send email.

```jsx
import sendMail from '~/libs/mail';
import compileEmailTemplate from '~/helpers/compile-email-template';

const template = await compileEmailTemplate({
  fileName: 'verifyEmail.mjml',
  data: {
    name: user.name,
    url: `${process.env.FRONTEND_URL}/verify-email?token=${token}`,
  },
});

sendMail(email, subject, template)
```
