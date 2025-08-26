// i18n/index.ts
import { createI18n } from 'vue-i18n'

// Import translation files
import en from '../localization/en.json'
import th from '../localization/th.json'
import lo from '../localization/la.json'

// Get stored language preference or default to English
const getDefaultLocale = (): string => {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('preferred-language')
    if (stored && ['en', 'th', 'lo'].includes(stored)) {
      return stored
    }
    
    // Try to detect browser language
    const browserLang = navigator.language.split('-')[0]
    if (['en', 'th', 'lo'].includes(browserLang)) {
      return browserLang
    }
  }
  return 'lo'
}

const i18n = createI18n({
  locale: getDefaultLocale(),
  fallbackLocale: 'lo',
  messages: {
    en,
    th,
    lo
  },
  legacy: false, // Use Composition API mode
  globalInjection: true
})

export default i18n

// Type definitions for better TypeScript support
export type MessageLanguages = keyof typeof i18n.global.messages
export type MessageSchema = typeof en