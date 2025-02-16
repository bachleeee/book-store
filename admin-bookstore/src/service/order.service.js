import createApiClient from "./api.service";
class UserService {
    constructor(baseUrl = "/api/users") {
        this.api = createApiClient(baseUrl);
    }
    async getAll() {
        return (await this.api.get(`/order/getall`)).data;
    }
    async create(data) {
        return (await this.api.post("/register", data)).data;
    }
    async login(data) {
        return (await this.api.post("/login", data)).data;
    }
    async logout(data) {
        return (await this.api.post("/logout", data)).data;
    }
    async get(id) {
        return (await this.api.get(`/${id}`)).data;
    }
    async update(id, data) {
        return (await this.api.put(`/order/${id}`, data)).data;
    }
    async deleteProductFromCart(token, data) {
        try {
            const response = await this.api.delete('/cart', {
                data: data,
                headers: {
                    'Authorization': `Bearer ${token}`
                },
            });

            return response.data;
        } catch (error) {
            throw new Error(error);
        }
    }

    async addtocart(token, data) {
        return (await this.api.post('/cart', data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })).data;
    }

    async getCart(token) {
        return (await this.api.get('/cart', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })).data;
    }

    async crateOrder(token, data) {
        return (await this.api.post('/order', data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })).data;
    }

    async getOrder(token) {
        return (await this.api.get('/order', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })).data;
    }

    async deleteOrder(token, data) {
        try {
            const response = await this.api.delete('/order', {
                data: data,
                headers: {
                    'Authorization': `Bearer ${token}`
                },
            });

            return response.data;
        } catch (error) {
            throw new Error(error);
        }
    }
}
export default new UserService();