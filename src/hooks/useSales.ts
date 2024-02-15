import { useState, useEffect } from "react";
import { products } from "../api/products";

interface Product {
  productId: number;
  productName: string;
  quantity: number;
  description: string;
  price: number;
}

export const useSales = () => {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quantityToSell, setQuantityToSell] = useState<{
    [productId: number]: number;
  }>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsResponse = await products.getAllProducts();
        setAllProducts(productsResponse.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const handleSell = async () => {
    if (
      selectedProduct &&
      quantityToSell[selectedProduct.productId] &&
      quantityToSell[selectedProduct.productId] > 0 &&
      quantityToSell[selectedProduct.productId] <= selectedProduct.quantity
    ) {
      const productId = selectedProduct.productId;
      const quantity = quantityToSell[productId];
      try {
        await products.sellProduct(productId, quantity);
        alert(
          `Venta realizada de ${quantity} unidades de ${selectedProduct.productName}`,
        );
        const updatedProducts = allProducts.map((product) =>
          product.productId === productId
            ? { ...product, quantity: product.quantity - quantity }
            : product,
        );
        setAllProducts(updatedProducts);
        setSelectedProduct(null);
        setQuantityToSell((prevState) => {
          const newState = { ...prevState };
          delete newState[productId];
          return newState;
        });
      } catch (error) {
        console.error("Error al vender el producto:", error);
      }
    } else {
      alert("La cantidad a vender no es válida");
    }
  };

  return {
    allProducts,
    selectedProduct,
    quantityToSell,
    setQuantityToSell,
    handleSell,
    setSelectedProduct,
  };
};
