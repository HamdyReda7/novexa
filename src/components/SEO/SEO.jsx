import React, { useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { useLanguage } from "../../context/LanguageContext";
import { defaultSEO, pagesSEO, SITE_URL } from "../../data/seo";
import {
    generateOrganizationSchema,
    generateWebSiteSchema,
    generateProfessionalServiceSchema,
    generateFAQPageSchema
} from "../../utils/structuredData";

/**
 * Reusable SEO Component
 * Manages document head tags for titles, descriptions, indexing rules, Open Graph,
 * Twitter Cards, localization, favicons, PWA manifests, and JSON-LD structured data.
 */
export default function SEO({
    pageKey = "",
    title = "",
    description = "",
    canonical = "",
    robots = "",
    keywords = "",
    image = "",
    type = "website",
    faqItems = null,
    customSchemas = null
}) {
    const { language } = useLanguage();
    const currentLang = language === "ar" || language === "en" ? language : "en";

    // 1. Resolve fallback configurations
    const fallbacks = defaultSEO[currentLang];
    const pageConfig = pagesSEO[pageKey]?.[currentLang] || {};

    // 2. Select final values with custom overrides taking highest priority
    const finalTitle = title || pageConfig.title || fallbacks.title;
    const finalDescription = description || pageConfig.description || fallbacks.description;
    const finalCanonical = canonical || pageConfig.canonical || SITE_URL;
    const finalRobots = robots || pageConfig.robots || fallbacks.robots;
    const finalAuthor = fallbacks.author;
    const finalThemeColor = fallbacks.themeColor;
    const finalViewport = fallbacks.viewport;
    const finalFavicon = fallbacks.favicon;
    const finalAppleTouchIcon = fallbacks.appleTouchIcon;
    const finalSiteName = fallbacks.siteName;
    const finalLocale = fallbacks.locale;

    // Convert keywords array to comma-separated string if needed
    const finalKeywords = useMemo(() => {
        const rawKeywords = keywords || pageConfig.keywords || fallbacks.keywords;
        if (Array.isArray(rawKeywords)) {
            return rawKeywords.join(", ");
        }
        return rawKeywords;
    }, [keywords, pageConfig.keywords, fallbacks.keywords]);

    // Resolve absolute image URL for cards
    const finalImage = useMemo(() => {
        const rawImage = image || pageConfig.image || fallbacks.favicon;
        if (rawImage.startsWith("http://") || rawImage.startsWith("https://")) {
            return rawImage;
        }
        return `${SITE_URL}${rawImage.startsWith("/") ? "" : "/"}${rawImage}`;
    }, [image, pageConfig.image, fallbacks.favicon]);

    // 3. Compute JSON-LD schemas
    const schemas = useMemo(() => {
        const schemasList = [];

        // Build core website and organization schemas only for the Home page
        if (pageKey === "home") {
            schemasList.push(generateOrganizationSchema(currentLang));
            schemasList.push(generateWebSiteSchema(currentLang));
            schemasList.push(generateProfessionalServiceSchema(currentLang));
        }

        // Build FAQ Page schema if faqItems are supplied
        if (faqItems && faqItems.length > 0) {
            const faqSchema = generateFAQPageSchema(faqItems);
            if (faqSchema) {
                schemasList.push(faqSchema);
            }
        }

        // Add custom schemas if provided
        if (customSchemas && Array.isArray(customSchemas)) {
            schemasList.push(...customSchemas);
        }

        return schemasList.filter(Boolean);
    }, [pageKey, currentLang, faqItems, customSchemas]);

    return (
        <Helmet>
            {/* HTML Lang attribute */}
            <html lang={currentLang} />

            {/* Basic Document Head Details */}
            <title>{finalTitle}</title>
            <meta name="description" content={finalDescription} />
            {finalKeywords && <meta name="keywords" content={finalKeywords} />}
            {finalAuthor && <meta name="author" content={finalAuthor} />}
            {finalRobots && <meta name="robots" content={finalRobots} />}
            {finalViewport && <meta name="viewport" content={finalViewport} />}

            {/* Canonical Link */}
            {finalCanonical && <link rel="canonical" href={finalCanonical} />}

            {/* Dynamic hreflang alternates (English & Arabic) */}
            <link rel="alternate" href={SITE_URL} hreflang="en" />
            <link rel="alternate" href={SITE_URL} hreflang="ar" />
            <link rel="alternate" href={SITE_URL} hreflang="x-default" />

            {/* Theme & Visual Brand Colors */}
            {finalThemeColor && <meta name="theme-color" content={finalThemeColor} />}

            {/* Favicons and Devices Touch Icons */}
            {finalFavicon && <link rel="icon" href={finalFavicon} />}
            {finalAppleTouchIcon && <link rel="apple-touch-icon" href={finalAppleTouchIcon} />}
            <link rel="manifest" href="/site.webmanifest" />

            {/* Open Graph Profile */}
            <meta property="og:title" content={finalTitle} />
            <meta property="og:description" content={finalDescription} />
            <meta property="og:image" content={finalImage} />
            <meta property="og:url" content={finalCanonical} />
            <meta property="og:type" content={type} />
            <meta property="og:site_name" content={finalSiteName} />
            <meta property="og:locale" content={finalLocale} />

            {/* Twitter Card Profile */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={finalTitle} />
            <meta name="twitter:description" content={finalDescription} />
            <meta name="twitter:image" content={finalImage} />

            {/* Structured Data Script Injections */}
            {schemas.map((schema, index) => (
                <script key={`jsonld-${index}`} type="application/ld+json">
                    {JSON.stringify(schema)}
                </script>
            ))}
        </Helmet>
    );
}
