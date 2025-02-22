"use client";

import React, { useCallback, useState } from "react";
import { useToast } from "@/lib/hooks";
import { IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import Scanner from "./_scanner";

import * as svc from "@/lib/services";

const RegisterBuying = () => {
  const { failure, success } = useToast();
  const [skus, setSkus] = useState<string[]>([]);

  const sendSKUs = async () => {
    try {
      await svc.debitItemsFromStorage(skus);
      success("SKUs debitados com sucesso!");
      setSkus([]);
    } catch (error) {
      console.error(error);
      failure("Não foi possível concluir a requisição.");
    }
  };

  const handleRemoveSku = (sku: string) => {
    setSkus(skus.filter((s) => s !== sku));
  };

  const handlOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.target as HTMLFormElement);
    const skuCode = form.get("sku")?.toString().trim() ?? "";

    if (skuCode === "" || skus.includes(skuCode)) return;
    setSkus([...skus, skuCode]);
    (e.target as HTMLFormElement).reset();
  };

  const handleScanResult = useCallback((scannedSKU: string) => {
    if (!skus || skus.includes(scannedSKU)) return;
    setSkus((prevTasks) => [...prevTasks, scannedSKU]);
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow w-full max-w-sm">
      <h2 className="text-xl font-medium text-center text-gray-800 mb-4">
        SKUs para baixa
      </h2>
      <Scanner
        beepEnabled
        onResult={handleScanResult}
        className="rounded-md mb-6"
      />
      <form
        onSubmit={handlOnSubmit}
        className="flex items-center border-b border-gray-300 pb-2 mb-4"
      >
        <input
          type="text"
          name="sku"
          placeholder="Digite o SKU"
          className="flex-grow p-2 text-sm focus:outline-none text-gray-700"
        />
        <IconButton type="submit" color="primary">
          <AddIcon fontSize="small" />
        </IconButton>
      </form>
      <ul className="divide-y divide-gray-200">
        {skus.map((s) => (
          <li
            key={s}
            className="flex justify-between items-center py-2 text-sm"
          >
            <span className="text-gray-700">{s}</span>
            <IconButton onClick={() => handleRemoveSku(s)} color="error">
              <DeleteIcon fontSize="small" />
            </IconButton>
          </li>
        ))}
      </ul>
      <button
        onClick={sendSKUs}
        disabled={skus.length > 0}
        className="mt-4 w-full py-2 bg-green-500 text-white text-sm rounded hover:bg-green-600 transition"
      >
        Enviar SKUs
      </button>
    </div>
  );
};

export default RegisterBuying;
