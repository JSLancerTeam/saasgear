import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import backend from 'i18next-http-backend';

import translationEn from '../locales/en.json';

const resources = {
  en: {
    translation: translationEn,
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