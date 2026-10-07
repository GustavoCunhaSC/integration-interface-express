import { api } from './api';

export const usersApi = {
  async listUsers() {
    const response = await api.get('/users');
    if (!Array.isArray(response.data)) {
      throw new Error('A listagem da API deve retornar um array de usuários.');
    }
    return response.data;
  },

  async getByID(id) {
    const response = await api.get(`/users/${id}`);
    return response.data;
  },

  async createUser(userData) {
    const response = await api.post('/users', userData)
    return response.data;
  }, 

  async updateUser(id, userData) {
    const response = await api.put(`/users/${id}`, userData);
    return response.data;
  },

  async deleteUser(id) {
    const response = await api.delete(`/users/${id}`);
    return response.data;
  }
};
