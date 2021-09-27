import handlebars from 'handlebars';
import mjml2html from 'mjml';
import fs from 'fs';
import path from 'path';

type Props = {
  fileName: string;
  data: {
    date?: string;
    name?: string;
    url?: string;
    teamName?: string;
    link?: string;
  }
}

export default async function compileEmailTemplate({ fileName, data }: Props): Promise<string> {
  const mjMail = await fs.promises.readFile(path.join('email-templates', fileName), 'utf8');
  const template = mjml2html(mjMail).html;
  return handlebars.compile(template)(data).toString();
}
