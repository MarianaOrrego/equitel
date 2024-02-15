import { useProviders } from "../../hooks/useProvider";
import "../styles/providers.css";

const Providers = () => {
  const {
    providerName,
    setProviderName,
    nit,
    setNit,
    cellphone,
    setCellphone,
    allProviders,
    isEditMode,
    handleEdit,
    handleAddOrUpdate,
    handleDelete,
    handleNumericInputChange,
  } = useProviders();

  return (
    <>
      <div className="table-container">
        <table className="provider-table">
          <thead>
            <tr>
              <th>Nombre del Proveedor</th>
              <th>NIT</th>
              <th>Celular</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {allProviders.map((provider) => (
              <tr key={provider.providerId}>
                <td>{provider.providerName}</td>
                <td>{provider.nit}</td>
                <td>{provider.cellphone}</td>
                <td>
                  <button
                    className="button"
                    onClick={() => handleEdit(provider)}
                  >
                    Editar
                  </button>
                  <button
                    className="button delete-button"
                    onClick={() => handleDelete(provider.providerId)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="container-providers">
        <form className="form-container-providers" onSubmit={handleAddOrUpdate}>
          <div className="input-group-providers">
            <label htmlFor="providerName">Nombre del Proveedor:</label>
            <input
              type="text"
              id="providerName"
              value={providerName}
              onChange={(e) => setProviderName(e.target.value)}
              required
            />
          </div>
          <div className="input-group-providers">
            <label htmlFor="nit">NIT:</label>
            <input
              type="text"
              id="nit"
              value={nit}
              onChange={(e) => handleNumericInputChange(e.target.value, setNit)}
              required
            />
          </div>
          <div className="input-group-providers">
            <label htmlFor="cellphone">Celular:</label>
            <input
              type="text"
              id="cellphone"
              value={cellphone}
              onChange={(e) =>
                handleNumericInputChange(e.target.value, setCellphone)
              }
              required
            />
          </div>
          <button type="submit" className="button">
            {isEditMode ? "Guardar Cambios" : "Agregar Proveedor"}
          </button>
        </form>
      </div>
    </>
  );
};

export default Providers;
