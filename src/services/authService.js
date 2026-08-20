import api from "./api";

export const authService = {
    async login(email, password) {
        const formData = new FormData();
        formData.append("email", email);
        formData.append("password", password);

        const response = await api.post("/login", formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
        return response.data;
    }
};
