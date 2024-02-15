import { useEffect, useState } from "react";
import { provider } from "../../api/provider";
import "../styles/providers.css";

interface Provider {
  providerId: number;
  providerName: string;
  nit: string;
  cellphone: string;
}

const Providers = () => {
  const [providerName, setProviderName] = useState("");
  const [nit, setNit] = useState("");
  const [cellphone, setCellphone] = useState("");
  const [allProviders, setAllProviders] = useState<Provider[]>([]);
  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(
    null,
  );
  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const providersResponse = await provider.getAllProviders();
        setAllProviders(providersResponse.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const handleEdit = (provider: Provider) => {
    setSelectedProvider(provider);
    setProviderName(provider.providerName);
    setNit(provider.nit);
    setCellphone(provider.cellphone);
    setIsEditMode(true);
  };

  const handleAddOrUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const providerData = {
        providerName,
        nit,
        cellphone,
      };
      if (isEditMode && selectedProvider) {
        await provider.updateProvider(
          selectedProvider.providerId,
          providerData,
        );
        setIsEditMode(false);
      } else {
        await provider.createProvider(providerData);
      }
      const response = await provider.getAllProviders();
      setAllProviders(response.data);
      setProviderName("");
      setNit("");
      setCellphone("");
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (providerId: number) => {
    const confirmDelete = window.confirm(
      "¿Estás seguro de que quieres eliminar este proveedor?",
    );
    if (confirmDelete) {
      try {
        await provider.deleteProvider(providerId);
        const updatedProviders = allProviders.filter(
          (provider) => provider.providerId !== providerId,
        );
        setAllProviders(updatedProviders);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleNumericInputChange = (value: string, setter: Function) => {
    const regex = /^[0-9]*$/;
    if (regex.test(value) || value === "") {
      setter(value);
    }
  };

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
