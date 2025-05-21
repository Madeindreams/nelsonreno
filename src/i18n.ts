import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from './locales/en.json';
import fr from './locales/fr.json';
import es from './locales/es.json';
import ja from './locales/ja.json';

i18n
    .use(LanguageDetector) // Detect browser language
    .use(initReactI18next)
    .init({
        resources: {
            en: { translation: en },
            fr: { translation: fr },
            es: { translation: es },
            ja: { translation: ja }
        },
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;
