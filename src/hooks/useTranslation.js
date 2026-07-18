import translations from "../locales/translations";
import { useLanguage } from "../context/LanguageContext";

export function useTranslation() {
    const { language } = useLanguage();

    const t = (key) => {
        if (!key) return "";

        const keys = key.split(".");

        // Safe traversal helper that checks types to avoid React object-render crashes
        const getValue = (langObj) => {
            let current = langObj;
            for (const item of keys) {
                if (current === null || current === undefined) return undefined;
                current = current[item];
            }
            return typeof current === "string" || typeof current === "number" ? current : undefined;
        };

        // 1. Try to get value in the current language
        const currentLangObj = translations[language];
        let val = currentLangObj ? getValue(currentLangObj) : undefined;

        // 2. Try English fallback if not found and current language is not English
        if (val === undefined && language !== "en") {
            const fallbackLangObj = translations.en;
            val = fallbackLangObj ? getValue(fallbackLangObj) : undefined;
        }

        // 3. Fall back to the key name itself if not found
        return val ?? key;
    };

    return {
        language,
        t,
    };
}

export default useTranslation;