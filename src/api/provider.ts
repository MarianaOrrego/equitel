import { api } from "./base.api";

const endpoint = "provider";

export const provider = {
  getAllProviders: function () {
    return api.get(endpoint);
  },

  getProvidersById: function (providerId: number) {
    return api.get(`${endpoint}/${providerId}`);
  },

  createProvider: function (provider: {
    providerName: string;
    nit: string;
    cellphone: string;
  }) {
    return api.post(endpoint, provider);
  },

  updateProvider: function (
    providerId: number,
    provider: {
      providerName: string;
      nit: string;
      cellphone: string;
    },
  ) {
    return api.put(`${endpoint}/${providerId}`, provider);
  },

  deleteProvider: function (providerId: number) {
    return api.delete(`${endpoint}/${providerId}`);
  },
};
