import createApiClient from "./api.service";
class ProductService {
    constructor(baseUrl = "/api/products") {
        this.api = createApiClient(baseUrl);
    }
    async create(data) {
        return (await this.api.post("/", data)).data;
    }
    async getAll(currentPage, limit, sortOrder = "", searchTerm = "") {
        return (await this.api.get(`/?page=${currentPage}&limit=${limit}&sort=${sortOrder}&search=${searchTerm}`)).data;
    }
    async getAllCat(cat, page, limit) {
        return (await this.api.get(`/?category=${cat}`, { params: { page, limit } })).data;
    }
    async deleteAll() {
        return (await this.api.delete("/")).data;
    }
    async getBySlug(slug) {
        return (await this.api.get(`/${slug}`)).data;
    }
    async get(id) {
        return (await this.api.get(`/${id}`)).data;
    }
    async update(id, data) {
        return (await this.api.put(`/${id}`, data)).data;
    }
    async delete(id) {
        return (await this.api.delete(`/${id}`)).data;
    }
}
export default new ProductService();