import { api } from "./base.api";

const endpoint = "rol";

export const rol = {
  getAllRol: function () {
    return api.get(endpoint);
  },

  getRolById: function (id: number) {
    return api.get(`${endpoint}/${id}`);
  },

};
