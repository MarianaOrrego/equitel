import { useEffect, useState } from "react";
import { products } from "../api/products";
import { provider } from "../api/provider";

interface Product {
  productId: number;
  productName: string;
  quantity: number;
  description: string;
  price: number;
  providerId: number;
  userId: number;
}

interface Provider {
  providerId: number;
  providerName: string;
}

export const useProducts = () => {
  const [productName, setProductName] = useState("");
  const [quantity, setQuantity] = useState<number>(0);
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [providerId, setProviderId] = useState<number>(0);
  const [providers, setProviders] = useState<Provider[]>([]);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);

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

    fetchProviders();
  }, []);

  const fetchProviders = async () => {
    try {
      const providersResponse = await provider.getAllProviders();
      setProviders(providersResponse.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
    setProductName(product.productName);
    setQuantity(product.quantity);
    setDescription(product.description);
    setPrice(product.price);
    setProviderId(product.providerId);
    setIsEditMode(true);
  };

  const handleAddOrUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const userId = localStorage.getItem("userId");
      const parsedUserId = userId ? parseInt(userId) : 1;

      const productData = {
        productName,
        quantity,
        description,
        price,
        providerId,
        userId: parsedUserId,
      };
      if (isEditMode && selectedProduct) {
        await products.updateProduct(selectedProduct.productId, productData);
        setIsEditMode(false);
      } else {
        await products.createProduct(productData);
      }
      const response = await products.getAllProducts();
      setAllProducts(response.data);
      setProductName("");
      setQuantity(0);
      setDescription("");
      setPrice(0);
      setProviderId(0);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (productId: number) => {
    const confirmDelete = window.confirm(
      "¿Estás seguro de que quieres eliminar este producto?",
    );
    if (confirmDelete) {
      try {
        await products.deleteProduct(productId);
        const updatedProducts = allProducts.filter(
          (product) => product.productId !== productId,
        );
        setAllProducts(updatedProducts);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return {
    productName,
    setProductName,
    quantity,
    setQuantity,
    description,
    setDescription,
    price,
    setPrice,
    providerId,
    setProviderId,
    providers,
    allProducts,
    selectedProduct,
    isEditMode,
    handleEdit,
    handleAddOrUpdate,
    handleDelete,
  };
};
