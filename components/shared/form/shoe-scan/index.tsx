"use client";

import React from "react";

import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";

import Loader from "@/components/ui/loader";
import Scanner from "@/components/ui/scanner";
import useShoeScanForm from "./use-shoe-scan";

const ShoeScanForm = () => {
  const {
    state,
    handleSendSkus,
    handleOnSubmit,
    handleRemoveSku,
    handleScanResult,
    handleActionChange,
    handleToggleScanner,
  } = useShoeScanForm();

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

  return (
    <React.Fragment>
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
        <React.Suspense fallback={<Loader />}>
          <Scanner
            beepEnabled
            onResult={handleScanResult}
            className="rounded-md mb-6"
          />
        </React.Suspense>
      )}
      <form
        onSubmit={handleOnSubmit}
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
        onClick={handleToggleScanner}
      >
        {state.scannerActive ? "Desativar Scanner" : "Ativar Scanner"}
      </button>
      <button
        onClick={handleSendSkus}
        disabled={state.skus.length === 0}
        className="mt-4 w-full py-2 bg-green-500 text-white text-sm rounded hover:bg-green-600 transition"
      >
        Enviar SKUs
      </button>
    </React.Fragment>
  );
};

export default ShoeScanForm;
