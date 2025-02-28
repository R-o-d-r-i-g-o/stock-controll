"use client";

import React, { useCallback, useState } from "react";
import { useToast } from "@/lib/hooks";
import { IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

import Scanner from "@/components/ui/scanner";

import * as svc from "@/lib/services";

const options = [
  {
    value: "register",
    label: "Cadastrar Itens",
  },
  {
    value: "debit",
    label: "Baixa nos Itens",
  },
];

const RegisterBuying = () => {
  const { failure, success } = useToast();
  const [state, setState] = useState<{
    skus: string[];
    scannerActive: boolean;
    oprationType: string;
  }>({
    skus: [],
    scannerActive: false,
    oprationType: "debit",
  });

  const handleActionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState((prevState) => ({
      ...prevState,
      oprationType: (event.target as HTMLInputElement).value,
    }));
  };

  const sendSKUs = async () => {
    try {
      await svc.debitItemsFromStorage({
        skus: state.skus,
        oprationType: state.oprationType as "debit" | "register",
      });
      success(
        state.oprationType === "debit"
          ? "SKUs debitados com sucesso!"
          : "SKUs cadastrados com sucesso!"
      );

      setState((prevState) => ({ ...prevState, skus: [] }));
    } catch (error) {
      console.error(error);
      failure("Não foi possível concluir a requisição.");
    }
  };

  const handleRemoveSku = (sku: string) => {
    setState((prevState) => ({
      ...prevState,
      skus: prevState.skus.filter((s) => s !== sku),
    }));
  };

  const handlOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.target as HTMLFormElement);
    const skuCode = form.get("sku")?.toString().trim() ?? "";

    if (skuCode === "" || state.skus.includes(skuCode)) return;
    setState((prevState) => ({
      ...prevState,
      skus: [...prevState.skus, skuCode],
    }));
    (e.target as HTMLFormElement).reset();
  };

  const handleScanResult = useCallback(
    (scannedSKU: string) =>
      setState((prevState) => ({
        ...prevState,
        skus: [...prevState.skus, scannedSKU],
      })),
    [state.skus]
  );

  return (
    <div className="bg-white p-6 rounded-lg shadow w-full max-w-sm">
      <h2 className="text-xl font-medium text-center text-gray-800 mb-4">
        SKUs para {state.oprationType === "debit" ? "baixa" : "cadastro"}
      </h2>
      <div className=" text-sm text-gray-600 mb-6">
        <span className="block text-left">Operação</span>
        <div className="flex justify-start gap-6 mt-2">
          {options.map((rt) => (
            <label key={rt.value} className="flex items-center space-x-2">
              <input
                type="radio"
                value={rt.value}
                checked={state.oprationType === rt.value}
                onChange={handleActionChange}
                className="text-indigo-600 focus:ring-indigo-500"
              />
              <span>{rt.label}</span>
            </label>
          ))}
        </div>
      </div>
      {state.scannerActive && (
        <Scanner
          beepEnabled
          onResult={handleScanResult}
          className="rounded-md mb-6"
        />
      )}
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
        {state.skus.map((s) => (
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
        className="mt-4 w-full py-2 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 transition"
        onClick={() =>
          setState((s) => ({ ...s, scannerActive: !s.scannerActive }))
        }
      >
        {state.scannerActive ? "Desativar Scanner" : "Ativar Scanner"}
      </button>
      <button
        onClick={sendSKUs}
        disabled={state.skus.length === 0}
        className="mt-4 w-full py-2 bg-green-500 text-white text-sm rounded hover:bg-green-600 transition"
      >
        Enviar SKUs
      </button>
    </div>
  );
};

export default RegisterBuying;
