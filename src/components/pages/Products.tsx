import { useEffect, useState } from "react";
import { products } from "../../api/products";
import { provider } from "../../api/provider";

import "../styles/products.css";

interface Product {
  productId: number;
  productName: string;
  quantity: number;
  description: string;
  price: number;
  providerId: number;
}

interface Provider {
  providerId: number;
  providerName: string;
}

const Products = () => {
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
      const productData = {
        productName,
        quantity,
        description,
        price,
        providerId,
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

  return (
    <>
      <div className="table-container">
        <table className="product-table">
          <thead>
            <tr>
              <th>Nombre del Producto</th>
              <th>Cantidad</th>
              <th>Descripción</th>
              <th>Precio</th>
              <th>Proveedor</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {allProducts.map((product) => (
              <tr key={product.productId}>
                <td>{product.productName}</td>
                <td>{product.quantity}</td>
                <td>{product.description}</td>
                <td>{product.price}</td>
                <td>
                  {
                    providers.find(
                      (provider) => provider.providerId === product.providerId,
                    )?.providerName
                  }
                </td>
                <td>
                  <button
                    className="button"
                    onClick={() => handleEdit(product)}
                  >
                    Editar
                  </button>
                  <button
                    className="button delete-button"
                    onClick={() => handleDelete(product.productId)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="container-products">
        <form className="form-container-products" onSubmit={handleAddOrUpdate}>
          <div className="input-group-products">
            <label htmlFor="productName">Nombre del Producto:</label>
            <input
              type="text"
              id="productName"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              required
            />
          </div>
          <div className="input-group-products">
            <label htmlFor="quantity">Cantidad:</label>
            <input
              type="number"
              id="quantity"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              required
            />
          </div>
          <div className="input-group-products">
            <label htmlFor="description">Descripción:</label>
            <input
              type="text"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div className="input-group-products">
            <label htmlFor="price">Precio:</label>
            <input
              type="number"
              id="price"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              required
            />
          </div>
          <div className="input-group-products">
            <label htmlFor="provider">Proveedor:</label>
            <select
              id="provider"
              value={providerId}
              onChange={(e) => setProviderId(Number(e.target.value))}
              required
            >
              <option value="">Seleccionar Proveedor</option>
              {providers.map((provider) => (
                <option key={provider.providerId} value={provider.providerId}>
                  {provider.providerName}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className="button">
            {isEditMode ? "Guardar Cambios" : "Agregar Producto"}
          </button>
        </form>
      </div>
    </>
  );
};

export default Products;
