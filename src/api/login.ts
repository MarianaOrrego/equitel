import { api } from "./base.api";

const endpoint = "login";

export const login = {
  findUser: function (user: { username: string; password: string;}) {
    return api.post(endpoint, user);
  }
};
