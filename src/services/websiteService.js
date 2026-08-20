import api from "./api";

export const websiteService = {
    async getProjects() {
        const response = await api.get("/all");
        return response.data;
    }
};
