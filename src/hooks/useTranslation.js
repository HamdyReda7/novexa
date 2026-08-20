import translations from "../locales/translations";
import { useLanguage } from "../context/LanguageContext";

export function useTranslation() {
    const { language } = useLanguage();

    const t = (key) => {
        if (!key) return "";

        const keys = key.split(".");

        const getValue = (langObj) => {
            let current = langObj;
            for (const item of keys) {
                if (current === null || current === undefined) return undefined;
                current = current[item];
            }
            return current;
        };

        // 1. Try to get value in current language
        const currentLangObj = translations[language];
        let val = currentLangObj ? getValue(currentLangObj) : undefined;

        // 2. Try English fallback
        if (val === undefined && language !== "en") {
            const fallbackLangObj = translations.en;
            val = fallbackLangObj ? getValue(fallbackLangObj) : undefined;
        }

        return val ?? key;
    };

    return {
        language,
        t,
    };
}

export default useTranslation;