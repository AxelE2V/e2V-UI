import { createContext, useContext, useState, type FC, type ReactNode } from 'react';
import type { Language, Translations } from '../types';
import { translations } from '../data/translations';

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export const LanguageProvider: FC<{ children: ReactNode; defaultLang?: Language }> = ({
  children,
  defaultLang = 'en',
}) => {
  const [lang, setLang] = useState<Language>(defaultLang);
  const t = translations[lang];

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export { LanguageContext };
