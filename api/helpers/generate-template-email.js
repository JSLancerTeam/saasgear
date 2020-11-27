import handlebars from 'handlebars';
import mjml2html from 'mjml';
import fs from 'fs';
import path from 'path';

export default async function generateEmailTemplate({ fileName, data }) {
  const mjMail = await fs.promises.readFile(path.join('email-template', fileName), 'utf8');
  const template = mjml2html(mjMail).html;
  return handlebars.compile(template)(data).toString();
}
