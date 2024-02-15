import { useProducts } from "../../hooks/useProducts";
import "../styles/products.css";

const Products = () => {
  const {
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
    isEditMode,
    handleEdit,
    handleAddOrUpdate,
    handleDelete,
  } = useProducts();

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
