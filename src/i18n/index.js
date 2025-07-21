import { createI18n } from 'vue-i18n'
import en from './locales/en.json'
import ar from './locales/ar.json'

const i18n = createI18n({
  legacy: false, // Enable Composition API mode
  locale: 'ar', // default locale
  fallbackLocale: 'en',
  globalInjection: true, // Enable global $t
  messages: {
    en,
    ar
  }
})

export default i18n