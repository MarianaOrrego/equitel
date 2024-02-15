import { useEffect, useState } from "react";
import { provider } from "../api/provider";

interface Provider {
  providerId: number;
  providerName: string;
  nit: string;
  cellphone: string;
}

export const useProviders = () => {
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

  return {
    providerName,
    setProviderName,
    nit,
    setNit,
    cellphone,
    setCellphone,
    allProviders,
    selectedProvider,
    isEditMode,
    handleEdit,
    handleAddOrUpdate,
    handleDelete,
    handleNumericInputChange,
  };
};
