import { api } from "./base.api";

const endpoint = "users";

export const users = {
  getAll: function () {
    return api.get(endpoint);
  },

  getById: function (id: number) {
    return api.get(`${endpoint}/${id}`);
  },

  createUser: function (user: { username: string; password: string; rolId: number }) {
    return api.post(endpoint, user);
  },

  updateUser: function (id: number, user: { username: string; password: string; rolId: number }) {
    return api.put(`${endpoint}/${id}`, user);
  },

  deleteUser: function (id: number) {
    return api.delete(`${endpoint}/${id}`);
  },
};
