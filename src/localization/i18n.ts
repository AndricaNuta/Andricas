import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as RNLocalize from 'react-native-localize';

import en from './locales/en.json';
import ro from './locales/ro.json';

const resources = {
  en: { translation: en },
  ro: { translation: ro },
};


const supported = Object.keys(resources); 

const best = RNLocalize.findBestLanguageTag(supported);
const initialLng = best?.languageTag?.split('-')[0] ?? 'en';

i18n
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v4',
    lng: initialLng,
    fallbackLng: 'en',
    resources,
    interpolation: {
      escapeValue: false,
    },
  });

