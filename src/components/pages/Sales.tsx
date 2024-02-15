import { useSales } from "../../hooks/useSales";
import "../styles/sales.css";

const Sales = () => {
  const {
    allProducts,
    selectedProduct,
    quantityToSell,
    setQuantityToSell,
    handleSell,
    setSelectedProduct,
  } = useSales();

  return (
    <div className="container-sales">
      <div className="table-container">
        <h2>Productos disponibles para la venta</h2>
        <table className="sales-table">
          <thead>
            <tr>
              <th>Producto</th>
              <th>Cantidad Disponible</th>
              <th>Precio Unitario</th>
              <th>Cantidad a Vender</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {allProducts.map((product) => (
              <tr key={product.productId}>
                <td>{product.productName}</td>
                <td>{product.quantity}</td>
                <td>{product.price}</td>
                <td>
                  <input
                    type="number"
                    value={quantityToSell[product.productId] || ""}
                    onChange={(e) =>
                      setQuantityToSell((prevState) => ({
                        ...prevState,
                        [product.productId]: Number(e.target.value),
                      }))
                    }
                    min="0"
                    max={product.quantity}
                  />
                </td>
                <td>
                  <button
                    onClick={() => setSelectedProduct(product)}
                    className="button-sales"
                  >
                    Vender
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {selectedProduct && (
        <div className="product-details">
          <h3>Detalles del Producto Seleccionado</h3>
          <p>Producto: {selectedProduct.productName}</p>
          <p>
            Cantidad a Vender: {quantityToSell[selectedProduct.productId] || 0}
          </p>
          <button onClick={handleSell} className="button-sales">
            Confirmar Venta
          </button>
        </div>
      )}
    </div>
  );
};

export default Sales;
