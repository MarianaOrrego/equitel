import { useState, useEffect } from "react";
import { products } from "../../api/products";
import "../styles/sales.css";

interface Product {
  productId: number;
  productName: string;
  quantity: number;
  description: string;
  price: number;
}

const Sales = () => {
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
                    value={quantityToSell}
                    onChange={(e) => setQuantityToSell(Number(e.target.value))}
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
          <p>Cantidad a Vender: {quantityToSell}</p>
          <button onClick={handleSell} className="button-sales">
            Confirmar Venta
          </button>
        </div>
      )}
    </div>
  );
};

export default Sales;
