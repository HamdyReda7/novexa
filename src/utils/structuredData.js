import { SITE_URL, companyDetails } from "../data/seo";

/**
 * Utility functions for generating JSON-LD structured data schemas.
 * Following Schema.org specifications and Google Search Central guidelines.
 * All dynamic fields are safely check-guarded to avoid generating fake structured data.
 */

/**
 * Generates the Organization schema for Novexa.
 * @param {string} lang - Current language ('en' | 'ar')
 * @returns {object} Organization JSON-LD object
 */
export const generateOrganizationSchema = (lang = "en") => {
    const isAr = lang === "ar";
    return {
        "@context": "https://schema.org",
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        "name": isAr ? "نوفيكسا" : "Novexa",
        "url": SITE_URL,
        "logo": {
            "@type": "ImageObject",
            "url": `${SITE_URL}/images/logo_nav.png`,
            "width": "512",
            "height": "512"
        },
        "contactPoint": {
            "@type": "ContactPoint",
            "telephone": companyDetails.phone || undefined,
            "contactType": "customer service",
            "email": companyDetails.email || undefined,
            "availableLanguage": ["en", "ar"]
        }
    };
};

/**
 * Generates the WebSite schema for search capabilities.
 * @param {string} lang - Current language ('en' | 'ar')
 * @returns {object} WebSite JSON-LD object
 */
export const generateWebSiteSchema = (lang = "en") => {
    const isAr = lang === "ar";
    return {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        "url": SITE_URL,
        "name": isAr ? "نوفيكسا" : "Novexa",
        "description": isAr
            ? "نبني مواقع أعمال احترافية، وتطبيقات ويب متكاملة، وحلول برمجية مخصصة عالية الأداء"
            : "We design and build high-performing web applications, business websites, and custom software solutions",
        "publisher": {
            "@id": `${SITE_URL}/#organization`
        },
        "inLanguage": lang
    };
};

/**
 * Generates the ProfessionalService schema for local search integration.
 * Omits fields like address, geo, phone, and openingHours if not defined or incomplete.
 * @param {string} lang - Current language ('en' | 'ar')
 * @returns {object} ProfessionalService JSON-LD object
 */
export const generateProfessionalServiceSchema = (lang = "en") => {
    const isAr = lang === "ar";
    const schema = {
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        "@id": `${SITE_URL}/#service`,
        "name": isAr ? "نوفيكسا" : "Novexa",
        "url": SITE_URL,
        "logo": `${SITE_URL}/images/logo_nav.png`,
        "image": `${SITE_URL}/images/logo_nav.png`,
        "priceRange": "$$"
    };

    // Safe addition of email
    if (companyDetails.email) {
        schema.email = companyDetails.email;
    }

    // Safe addition of telephone
    if (companyDetails.phone) {
        schema.telephone = companyDetails.phone;
    }

    // Safe addition of address (only locality and country from localization, no fake street address)
    if (companyDetails.address && companyDetails.address.addressLocality) {
        schema.address = {
            "@type": "PostalAddress",
            "addressLocality": isAr ? "المنصورة" : companyDetails.address.addressLocality,
            "addressCountry": companyDetails.address.addressCountry || "EG"
        };
        if (companyDetails.address.streetAddress) {
            schema.address.streetAddress = companyDetails.address.streetAddress;
        }
    }

    // Safe addition of opening hours (only if explicitly defined in companyDetails)
    if (companyDetails.openingHours && companyDetails.openingHours.length > 0) {
        schema.openingHoursSpecification = {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": companyDetails.openingHours,
            "opens": companyDetails.openingHoursOpens || "09:00",
            "closes": companyDetails.openingHoursCloses || "18:00"
        };
    }

    // Safe addition of geo-coordinates (omitted completely by default, no fake coordinates generated)
    if (companyDetails.geo && companyDetails.geo.latitude && companyDetails.geo.longitude) {
        schema.geo = {
            "@type": "GeoCoordinates",
            "latitude": companyDetails.geo.latitude,
            "longitude": companyDetails.geo.longitude
        };
    }

    return schema;
};

/**
 * Generates the FAQPage schema if FAQ questions are visible on the page.
 * @param {Array<{question: string, answer: string}>} faqItems - Array of question-answer pairs
 * @returns {object|null} FAQPage JSON-LD object or null if empty
 */
export const generateFAQPageSchema = (faqItems) => {
    if (!faqItems || !Array.isArray(faqItems) || faqItems.length === 0) {
        return null;
    }
    return {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqItems.map(item => ({
            "@type": "Question",
            "name": item.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": item.answer
            }
        }))
    };
};
