import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

import { router } from "./router/Router";
import { ThemeProvider } from "./context/ThemeContext";
import { LanguageProvider } from "./context/LanguageContext";
import { AuthProvider } from "./context/AuthContext";
import "./style/variables.css";

ReactDOM.createRoot(document.getElementById("root")).render(
    <ThemeProvider>
        <LanguageProvider>
            <AuthProvider>
                <HelmetProvider>
                    <RouterProvider router={router} />
                </HelmetProvider>
            </AuthProvider>
        </LanguageProvider>
    </ThemeProvider>
);