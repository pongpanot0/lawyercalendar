import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enTranslation from './componenets/locales/en.json';
import esTranslation from './componenets/locales/th.json';

const resources = {
  en: {
    translation: enTranslation,
  },
  th: {
    translation: esTranslation,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  fallbackLng: 'th',

  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
