const SibApiV3Sdk = require('@getbrevo/brevo');

export default async function sendMail(to: string, subject: string, html: string): Promise<boolean> {
 console.log('here')
  let apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

  // Set your API key
  let apiKey = apiInstance.authentications.apiKey;
  apiKey.apiKey = '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';

  let sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

  sendSmtpEmail.subject = subject;
  sendSmtpEmail.htmlContent = html;
  sendSmtpEmail.sender = { 'name': 'sidharth', 'email': 'sidharth15nayyar@gmail.com' };
  sendSmtpEmail.to = [{ 'email': to, 'name': 'Recipient Name' }]; // "Recipient Name" can be replaced or dynamically set
  sendSmtpEmail.replyTo = { 'email': 'reply@example.com', 'name': 'Reply Name' };
  sendSmtpEmail.headers = { 'bruh': 'unique-id-123dasdadadad4' };
  sendSmtpEmail.params = { 'parameter': 'My param value', 'subject': subject };

  try {
    apiInstance.sendTransacEmail(sendSmtpEmail);
    console.log('Brevo mail sent to:', to);
    return true;
  } catch (error) {
    console.error('Brevo mail sending error:', error);
    return false;
  }
}
