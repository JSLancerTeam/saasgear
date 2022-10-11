import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import backend from 'i18next-http-backend';

import authFile from '../locales/en/auth.json';

const resources = {
  en: {
    auth: authFile
  }
}

i18n
  .use(backend)
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    interpolation: {
      escapeValue: false,
    }
  });

export default i18n;