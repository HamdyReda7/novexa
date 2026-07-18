/**
 * SEO Configuration for Novexa Website
 */

export const SITE_URL = "https://indigo-badger-333662.hostingersite.com";

export const defaultSEO = {
    en: {
        title: "Novexa | Custom Web & Software Development Agency",
        description: "We design and build high-performing web applications, business websites, and custom software solutions — backed by sharp UI/UX design and architecture built to scale.",
        keywords: "software development, web development, custom software, UI/UX design, mobile apps, e-commerce development, AI solutions, SaaS, Mansoura, Egypt, Novexa",
        author: "Novexa Team",
        siteName: "Novexa",
        locale: "en_US",
        themeColor: "#8B5CF6", // Novexa Primary violet color
        robots: "index, follow",
        favicon: "/images/logo_nav.png",
        appleTouchIcon: "/images/logo_nav.png",
        viewport: "width=device-width, initial-scale=1.0"
    },
    ar: {
        title: "نوفيكسا | شركة تطوير برمجيات ومواقع مخصصة",
        description: "نبني مواقع أعمال احترافية، وتطبيقات ويب متكاملة، وحلول برمجية مخصصة عالية الأداء — بتصميم واجهات (UI/UX) عصري وبنية برمجية مهيأة للتوسع.",
        keywords: "تطوير البرمجيات, تطوير الويب, برمجيات مخصصة, تصميم واجهات المستخدم, تطبيقات الجوال, المتاجر الإلكترونية, حلول الذكاء الاصطناعي, المنصورة, مصر, نوفيكسا",
        author: "فريق نوفيكسا",
        siteName: "نوفيكسا",
        locale: "ar_AR",
        themeColor: "#8B5CF6",
        robots: "index, follow",
        favicon: "/images/logo_nav.png",
        appleTouchIcon: "/images/logo_nav.png",
        viewport: "width=device-width, initial-scale=1.0"
    }
};

export const pagesSEO = {
    home: {
        en: {
            title: "Novexa | Custom Web & Software Development Agency",
            description: "We design and build high-performing web applications, business websites, and custom software solutions — backed by sharp UI/UX design and architecture built to scale.",
            canonical: `${SITE_URL}/`
        },
        ar: {
            title: "نوفيكسا | شركة تطوير برمجيات ومواقع مخصصة",
            description: "نبني مواقع أعمال احترافية، وتطبيقات ويب متكاملة، وحلول برمجية مخصصة عالية الأداء — بتصميم واجهات (UI/UX) عصري وبنية برمجية مهيأة للتوسع.",
            canonical: `${SITE_URL}/`
        }
    }
};

/**
 * Company details extracted from the site's footer/contact translation file.
 * Used exclusively for JSON-LD structured data (Organization, ProfessionalService).
 * Optional values are left out or check-guarded to avoid generating fake structured data.
 */
export const companyDetails = {
    email: "novexacode@gmail.com",
    phone: "+201023838099",
    address: {
        addressLocality: "Mansoura",
        addressCountry: "EG"
    },
    openingHours: [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday"
    ],
    openingHoursOpens: "09:00",
    openingHoursCloses: "18:00"
};
