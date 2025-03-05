import React from "react";
import { useToast } from "@/lib/hooks/use-toast";

import * as svc from "@/lib/services";

type StateManagement = {
  skus: string[];
  scannerActive: boolean;
  oprationType: string;
};

const useShoeScanForm = () => {
  const { failure, success } = useToast();
  const [state, setState] = React.useState<StateManagement>({
    skus: [],
    scannerActive: false,
    oprationType: "debit",
  });

  const handleToggleScanner = () => {
    setState((s) => ({ ...s, scannerActive: !s.scannerActive }));
  };

  const handleActionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState((prevState) => ({
      ...prevState,
      oprationType: (event.target as HTMLInputElement).value,
    }));
  };

  const handleSendSkus = async () => {
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

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
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

  const handleScanResult = React.useCallback(
    (scannedSku: string) =>
      setState((prevState) => ({
        ...prevState,
        skus: [...prevState.skus, scannedSku],
      })),
    []
  );

  return {
    state,
    handleSendSkus,
    handleOnSubmit,
    handleRemoveSku,
    handleScanResult,
    handleActionChange,
    handleToggleScanner,
  };
};

export default useShoeScanForm;
