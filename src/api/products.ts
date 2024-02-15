import { api } from "./base.api";

const endpoint = "products";

export const products = {
  getAllProducts: function () {
    return api.get(endpoint);
  },

  getProductsById: function (productId: number) {
    return api.get(`${endpoint}/${productId}`);
  },

  createProduct: function (product: {
    productName: string;
    quantity: number;
    description: string;
    price: number;
    providerId: number;
    userId: number;
  }) {
    return api.post(endpoint, product);
  },

  updateProduct: function (
    productId: number,
    product: {
      productName: string;
      quantity: number;
      description: string;
      price: number;
      providerId: number;
      userId: number;
    },
  ) {
    return api.put(`${endpoint}/${productId}`, product);
  },

  deleteProduct: function (productId: number) {
    return api.delete(`${endpoint}/${productId}`);
  },

  sellProduct: function (productId: number, quantity: number) {
    return api.post(`${endpoint}/sell/${productId}`, { productId, quantity });
  },
};
