import { api } from "./base.api";

const endpoint = "users";

export const users = {
  getAllUsers: function () {
    return api.get(endpoint);
  },

  getUserById: function (id: number) {
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
