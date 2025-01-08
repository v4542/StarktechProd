import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import your translation files
import translationEN from './locales/en/translation.json';
import translationMR from './locales/mr/translation.json';

const resources = {
  en: {
    translation: translationEN
  },
  mr: {
    translation: translationMR
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    lng: sessionStorage.getItem('currentLanguage') || 'en', // Get initial language from session storage
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;