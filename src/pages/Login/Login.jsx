import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import { useLanguage } from "../../context/LanguageContext";
import { useTranslation } from "../../hooks/useTranslation";
import { authService } from "../../services/authService";
import { FiMail, FiLock, FiGlobe, FiSun, FiMoon, FiAlertCircle } from "react-icons/fi";
import "./Login.css";

export default function Login() {
    const { t } = useTranslation();
    const { token, loading: authLoading, login } = useAuth();
    const { theme, toggleTheme } = useTheme();
    const { language, toggleLanguage } = useLanguage();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    // Auto-redirect if already logged in
    useEffect(() => {
        if (!authLoading && token) {
            navigate("/dashboard", { replace: true });
        }
    }, [token, authLoading, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (loading) return;

        setErrorMsg("");
        setLoading(true);

        try {
            const result = await authService.login(email, password);
            if (result && result.success) {
                // Core check: only authenticated user role allows dashboard access
                if (result.data && result.data.role === "user") {
                    login(result.token, result.data);
                    navigate("/dashboard", { replace: true });
                } else {
                    setErrorMsg(t("dashboard.auth.invalidRoleError"));
                }
            } else {
                setErrorMsg(result?.message || "Login failed.");
            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                setErrorMsg(error.response.data.message);
            } else {
                setErrorMsg(t("dashboard.auth.networkError"));
            }
        } finally {
            setLoading(false);
        }
    };

    if (authLoading) {
        return (
            <div className="auth-loading-screen">
                <span className="auth-loading-text">Loading...</span>
            </div>
        );
    }

    return (
        <div className="login-page-wrapper">
            {/* Toolbar */}
            <div className="login-toolbar">
                <button 
                    className="toolbar-btn" 
                    onClick={toggleLanguage}
                    title={t("navbar.switchLanguage")}
                    aria-label={t("navbar.switchLanguage")}
                >
                    <FiGlobe size={18} />
                    <span className="toolbar-lang-code">{language.toUpperCase()}</span>
                </button>
                <button 
                    className="toolbar-btn" 
                    onClick={toggleTheme}
                    title={t("navbar.switchTheme")}
                    aria-label={t("navbar.switchTheme")}
                >
                    {theme === "dark" ? <FiSun size={18} /> : <FiMoon size={18} />}
                </button>
            </div>

            <div className="login-card-container">
                {/* Brand Logo */}
                <div className="login-brand-logo">
                    <div className="brand-logo-icon">N</div>
                    <span className="brand-logo-text">Novexa Admin</span>
                </div>

                <div className="login-header-group">
                    <h2 className="login-title">{t("dashboard.auth.loginTitle")}</h2>
                    <p className="login-subtitle">{t("dashboard.auth.loginSubtitle")}</p>
                </div>

                {/* Error Banner */}
                {errorMsg && (
                    <div className="login-error-banner" role="alert">
                        <FiAlertCircle size={18} className="error-banner-icon" />
                        <span className="error-banner-text">{errorMsg}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="login-form-element">
                    {/* Email */}
                    <div className="form-group-field">
                        <label htmlFor="login-email">{t("dashboard.auth.emailLabel")}</label>
                        <div className="input-with-icon-wrapper">
                            <FiMail className="input-field-icon" size={20} aria-hidden="true" />
                            <input 
                                type="email" 
                                id="login-email" 
                                placeholder={t("dashboard.auth.emailPlaceholder")}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                disabled={loading}
                                className="login-text-input"
                            />
                        </div>
                    </div>

                    {/* Password */}
                    <div className="form-group-field">
                        <label htmlFor="login-password">{t("dashboard.auth.passwordLabel")}</label>
                        <div className="input-with-icon-wrapper">
                            <FiLock className="input-field-icon" size={20} aria-hidden="true" />
                            <input 
                                type="password" 
                                id="login-password" 
                                placeholder={t("dashboard.auth.passwordPlaceholder")}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                disabled={loading}
                                className="login-text-input"
                            />
                        </div>
                    </div>

                    {/* Submit */}
                    <button 
                        type="submit" 
                        disabled={loading}
                        className="login-submit-btn-action"
                    >
                        {loading ? (
                            <>
                                <span className="btn-spinner" />
                                <span>{t("dashboard.auth.submitting")}</span>
                            </>
                        ) : (
                            <span>{t("dashboard.auth.submitBtn")}</span>
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
}
