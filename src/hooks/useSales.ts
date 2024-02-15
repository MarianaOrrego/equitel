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
  const [quantityToSell, setQuantityToSell] = useState<number>(0);

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
      quantityToSell > 0 &&
      quantityToSell <= selectedProduct.quantity
    ) {
      try {
        await products.sellProduct(selectedProduct.productId, quantityToSell);
        alert(
          `Venta realizada de ${quantityToSell} unidades de ${selectedProduct.productName}`,
        );
        const updatedProducts = allProducts.map((product) =>
          product.productId === selectedProduct.productId
            ? { ...product, quantity: product.quantity - quantityToSell }
            : product,
        );
        setAllProducts(updatedProducts);
        setSelectedProduct(null);
        setQuantityToSell(0);
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
