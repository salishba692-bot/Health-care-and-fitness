import React, { createContext, useContext, useState, useEffect } from 'react';

export type AppLanguage = 'en' | 'ur';

interface LanguageContextValue {
  lang: AppLanguage;
  setLang: (lang: AppLanguage) => void;
  toggleLang: () => void;
  isUrdu: boolean;
}

const LanguageContext = createContext<LanguageContextValue>({
  lang: 'en',
  setLang: () => {},
  toggleLang: () => {},
  isUrdu: false,
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<AppLanguage>(() => {
    try {
      const saved = localStorage.getItem('carehub_language');
      return saved === 'ur' ? 'ur' : 'en';
    } catch {
      return 'en';
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('carehub_language', lang);
      document.documentElement.lang = lang === 'ur' ? 'ur' : 'en';
    } catch {
      // ignore storage errors
    }
  }, [lang]);

  const setLang = (next: AppLanguage) => setLangState(next);
  const toggleLang = () => setLangState(prev => (prev === 'en' ? 'ur' : 'en'));

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, isUrdu: lang === 'ur' }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
