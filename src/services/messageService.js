import api from "./api";

export const messageService = {
    async getAllMessages(page = 1) {
        const response = await api.get(`/orders/all?page=${page}`);
        return response.data;
    },

    async showOrder(id) {
        const response = await api.get(`/show/order/${id}`);
        return response.data;
    },

    async deleteOrder(id) {
        const response = await api.delete(`/delete/order/${id}`);
        return response.data;
    }
};
