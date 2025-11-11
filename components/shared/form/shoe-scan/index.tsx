"use client";

import React from "react";

import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import SendIcon from "@mui/icons-material/Send";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import { IconButton, CircularProgress } from "@mui/material";

import Loader from "@/components/ui/loader";
import Scanner from "@/components/ui/scanner";
import useShoeScanForm from "./use-shoe-scan";

const ShoeScanForm = () => {
  const { state, handleSendSkus, handleOnSubmit, handleRemoveSku, handleScanResult, handleActionChange, handleToggleScanner } = useShoeScanForm();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const options = [
    {
      value: "register",
      label: "Cadastrar Itens",
      icon: "📝",
    },
    {
      value: "debit",
      label: "Baixa nos Itens",
      icon: "📉",
    },
  ];

  const handleSubmit = async () => {
    setIsSubmitting(true);
    await handleSendSkus();
    setIsSubmitting(false);
  };

  return (
    <div className="space-y-6">
      {/* Operation Type Selection */}
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-4 border-2 border-indigo-200">
        <span className="block text-left font-semibold text-gray-800 mb-3">Tipo de Operação</span>
        <div className="flex flex-col sm:flex-row gap-4">
          {options.map((rt) => (
            <label
              key={rt.value}
              className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-all ${
                state.oprationType === rt.value
                  ? "bg-indigo-600 text-white shadow-md"
                  : "bg-white text-gray-700 hover:bg-indigo-50"
              }`}
            >
              <input
                type="radio"
                value={rt.value}
                checked={state.oprationType === rt.value}
                onChange={handleActionChange}
                className="hidden"
              />
              {state.oprationType === rt.value ? (
                <RadioButtonCheckedIcon className="text-xl" />
              ) : (
                <RadioButtonUncheckedIcon className="text-xl" />
              )}
              <span className="text-lg mr-2">{rt.icon}</span>
              <span className="font-medium">{rt.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Scanner Section */}
      {state.scannerActive && (
        <div className="bg-white rounded-xl shadow-lg p-4 border-2 border-indigo-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <QrCodeScannerIcon className="text-indigo-600" />
              Scanner Ativo
            </h3>
            <button
              onClick={handleToggleScanner}
              className="text-sm text-gray-600 hover:text-gray-800 underline"
            >
              Fechar
            </button>
          </div>
          <React.Suspense fallback={<Loader />}>
            <Scanner beepEnabled onResult={handleScanResult} paused={false} />
          </React.Suspense>
        </div>
      )}

      {/* Manual Input Form */}
      <div className="bg-white rounded-lg shadow-md p-4 border-2 border-gray-200">
        <form onSubmit={handleOnSubmit} className="flex items-center gap-2">
          <input
            type="text"
            name="sku"
            placeholder="Digite ou escaneie o SKU"
            className="flex-grow p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-700"
            autoComplete="off"
          />
          <IconButton
            type="submit"
            className="!bg-indigo-600 !text-white hover:!bg-indigo-700 !transition-colors"
            aria-label="Adicionar SKU"
          >
            <AddIcon />
          </IconButton>
        </form>
      </div>

      {/* SKU List */}
      {state.skus.length > 0 && (
        <div className="bg-white rounded-lg shadow-md border-2 border-gray-200">
          <div className="p-4 border-b border-gray-200">
            <h3 className="font-semibold text-gray-800">
              SKUs Escaneados ({state.skus.length})
            </h3>
          </div>
          <ul className="divide-y divide-gray-200 max-h-64 overflow-y-auto">
            {state.skus.map((s, index) => (
              <li
                key={`${s}-${index}`}
                className="flex justify-between items-center py-3 px-4 hover:bg-gray-50 transition-colors"
              >
                <span className="text-gray-700 font-mono text-sm">{s}</span>
                <IconButton
                  onClick={() => handleRemoveSku(s)}
                  className="!text-red-600 hover:!bg-red-50"
                  aria-label={`Remover ${s}`}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={handleToggleScanner}
          className={`flex-1 py-3 px-4 font-semibold rounded-lg transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 ${
            state.scannerActive
              ? "bg-red-500 text-white hover:bg-red-600"
              : "bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700"
          }`}
        >
          <QrCodeScannerIcon />
          {state.scannerActive ? "Desativar Scanner" : "Ativar Scanner"}
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          disabled={state.skus.length === 0 || isSubmitting}
          className={`flex-1 py-3 px-4 font-semibold rounded-lg transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 ${
            state.skus.length === 0 || isSubmitting
              ? "bg-gray-400 text-gray-200 cursor-not-allowed"
              : "bg-gradient-to-r from-green-600 to-green-700 text-white hover:from-green-700 hover:to-green-800"
          }`}
        >
          {isSubmitting ? (
            <>
              <CircularProgress size={20} className="!text-white" />
              <span>Processando...</span>
            </>
          ) : (
            <>
              <SendIcon />
              Enviar SKUs ({state.skus.length})
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default ShoeScanForm;
