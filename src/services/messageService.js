import api from "./api";

export const messageService = {
    async getAllMessages(page = 1) {
        try {
            const response = await api.get(`/all/messages?page=${page}`);
            return response.data;
        } catch {
            try {
                const response = await api.get(`/messages/all?page=${page}`);
                return response.data;
            } catch {
                const response = await api.get(`/orders/all?page=${page}`);
                return response.data;
            }
        }
    },

    async showOrder(id) {
        try {
            const response = await api.get(`/show/message/${id}`);
            return response.data;
        } catch {
            const response = await api.get(`/show/order/${id}`);
            return response.data;
        }
    },

    async deleteOrder(id) {
        try {
            const response = await api.delete(`/delete/message/${id}`);
            return response.data;
        } catch {
            const response = await api.delete(`/delete/order/${id}`);
            return response.data;
        }
    },

    async createOrder(data) {
        try {
            const response = await api.post("/orders", data);
            return response.data;
        } catch (e) {
            try {
                const response = await api.post("/contact", data);
                return response.data;
            } catch {
                throw e;
            }
        }
    }
};
