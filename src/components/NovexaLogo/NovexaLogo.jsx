import React from "react";
import logoNav from "../../assets/images/logo_nav.png";

export function NovexaIcon({ size = 36, className = "" }) {
    return (
        <img
            src={logoNav}
            alt="Novexa Icon"
            style={{ height: `${size}px`, width: "auto", objectFit: "contain" }}
            className={`novexa-logo-img ${className}`}
        />
    );
}

export function NovexaLogo({ variant = "horizontal", size = 38, className = "" }) {
    return (
        <div className={`novexa-logo-container ${className}`} style={{ display: "inline-flex", alignItems: "center" }}>
            <img
                src={logoNav}
                alt="Novexa Logo"
                style={{ height: `${size}px`, width: "auto", objectFit: "contain" }}
                className="novexa-brand-logo-img"
            />
        </div>
    );
}

export default NovexaLogo;
