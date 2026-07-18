import api from "./api";

export const categoryService = {
    async getAllCategories(page = 1) {
        const response = await api.get(`/categories/all?page=${page}`);
        return response.data;
    },

    async createCategory(formData) {
        const response = await api.post("/create/category", formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
        return response.data;
    },

    async updateCategory(id, formData) {
        const response = await api.post(`/update/category/${id}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
        return response.data;
    },

    async deleteCategory(id) {
        const response = await api.delete(`/delete/category/${id}`);
        return response.data;
    }
};
