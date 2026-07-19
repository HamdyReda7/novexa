import api from "./api";

export const projectService = {
    async getProjects(page = 1) {
        const response = await api.get(`/projects/all?page=${page}`);
        return response.data;
    },

    async createProject(formData) {
        const response = await api.post("/create/project", formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
        return response.data;
    },

    async updateProject(id, formData) {
        const response = await api.post(`/update/project/${id}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
        return response.data;
    },

    async deleteProject(id) {
        const response = await api.delete(`/delete/project/${id}`);
        return response.data;
    }
};
