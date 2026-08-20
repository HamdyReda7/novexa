/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [token, setToken] = useState(() => sessionStorage.getItem("authToken"));
    const [user, setUser] = useState(() => {
        const savedUser = sessionStorage.getItem("authUser");
        try {
            return savedUser ? JSON.parse(savedUser) : null;
        } catch {
            return null;
        }
    });
    const [loading] = useState(false);

    const login = (newToken, userData) => {
        sessionStorage.setItem("authToken", newToken);
        sessionStorage.setItem("authUser", JSON.stringify(userData));
        localStorage.removeItem("authToken");
        localStorage.removeItem("authUser");
        setToken(newToken);
        setUser(userData);
    };

    const logout = () => {
        sessionStorage.removeItem("authToken");
        sessionStorage.removeItem("authUser");
        localStorage.removeItem("authToken");
        localStorage.removeItem("authUser");
        setToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ token, user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
