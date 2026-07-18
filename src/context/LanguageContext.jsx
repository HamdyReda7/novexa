/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";

const LanguageContext = createContext(null);

function getInitialLanguage() {
    if (typeof window === "undefined") {
        return "en";
    }

    try {
        const savedLanguage = window.localStorage.getItem("language");
        if (savedLanguage === "en" || savedLanguage === "ar") {
            return savedLanguage;
        }
    } catch {
        // Ignore storage access issues.
    }

    return "en";
}

export function LanguageProvider({ children }) {
    const [language, setLanguage] = useState(getInitialLanguage);

    useEffect(() => {
        document.documentElement.lang = language;
        document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
        document.documentElement.style.direction = language === "ar" ? "rtl" : "ltr";

        try {
            window.localStorage.setItem("language", language);
        } catch {
            // Ignore storage errors in restricted environments.
        }
    }, [language]);

    const toggleLanguage = () => {
        setLanguage((currentLanguage) => (currentLanguage === "en" ? "ar" : "en"));
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    return useContext(LanguageContext);
}