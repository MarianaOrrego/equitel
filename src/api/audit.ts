import { api } from "./base.api";

const endpoint = "audit";

export const audit = {
  getAllAudit: function () {
    return api.get(endpoint);
  },
};
