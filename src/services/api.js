import axios from "axios";

const baseUrl = import.meta.env.VITE_API_BASE_URL || "";

const api = axios.create({
    baseURL: `${baseUrl}/api`,
    headers: {
        "Accept": "application/json"
    }
});

export const resolveImageUrl = (image) => {
    if (!image) return null;
    if (image.startsWith("http://") || image.startsWith("https://")) {
        return image;
    }
    const path = image.startsWith("/") ? image : `/${image}`;
    return `${baseUrl}${path}`;
};

// Request Interceptor: Attach token if present
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("authToken");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response Interceptor: Intercept 401 codes for autologout
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem("authToken");
            localStorage.removeItem("authUser");
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);

export default api;
