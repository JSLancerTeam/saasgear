import handlebars from 'handlebars';
import { execSync } from 'child_process';
import path from 'path';

export default function generateEmailTemplate({ fileName, data }) {
  const templatePath = `${path.resolve()}/email-template/${fileName}`;
  const template = execSync(`mjml ${templatePath}`).toString();
  return handlebars.compile(template)(data).toString();
}
