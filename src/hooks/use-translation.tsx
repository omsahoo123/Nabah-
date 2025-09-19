'use client';
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from 'react';
import { useRouter } from 'next/navigation';

// Import your language files
import en from '@/locales/en.json';
import hi from '@/locales/hi.json';
import pa from '@/locales/pa.json';

type Language = 'en' | 'hi' | 'pa';

// A simple key-value dictionary for translations
type Translations = { [key: string]: string | Translations };

const dictionaries: { [key in Language]: Translations } = {
  en,
  hi,
  pa,
};

// A helper function to get nested keys
const get = (obj: any, path: string) => {
  const keys = path.split('.');
  let result = obj;
  for (const key of keys) {
    if (result && typeof result === 'object' && key in result) {
      result = result[key];
    } else {
      return null;
    }
  }
  return result;
};

interface TranslationContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, options?: { [key: string]: string | number }) => string;
  ready: boolean;
}

const TranslationContext = createContext<TranslationContextType | undefined>(
  undefined
);

export function TranslationProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const storedLang = localStorage.getItem('language') as Language | null;
    if (storedLang && ['en', 'hi', 'pa'].includes(storedLang)) {
      setLanguageState(storedLang);
    }
    setReady(true);
  }, []);

  const setLanguage = (lang: Language) => {
    localStorage.setItem('language', lang);
    setLanguageState(lang);
  };

  const t = useCallback(
    (key: string, options?: { [key: string]: string | number }): string => {
      const langDict = dictionaries[language];
      let translation = get(langDict, key) as string | null;

      if (translation === null) {
        // Fallback to English if translation is not found
        translation = get(dictionaries.en, key) as string | null;
      }

      if (translation === null) {
        console.warn(`Translation key "${key}" not found.`);
        return key;
      }

      if (options) {
        Object.keys(options).forEach((optKey) => {
          translation = translation!.replace(
            `{{${optKey}}}`,
            String(options[optKey])
          );
        });
      }

      return translation;
    },
    [language]
  );

  return (
    <TranslationContext.Provider value={{ language, setLanguage, t, ready }}>
      {ready ? children : null}
    </TranslationContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(TranslationContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
}
