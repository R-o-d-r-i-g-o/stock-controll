"use client";

import React from "react";

import InputText from "@/components/ui/input-text";
import InputLable from "@/components/ui/input-lable";
import InputError from "@/components/ui/input-error";
import useAccountEditForm from "./use-account-edit";

type AccountEditFormProps = {
  customSubmitButton?: React.ReactNode;
  data: {
    id: number;
    code: string;
    name: string;
    subscriptionExpiresAt?: Date | null;
  };
};

const AccoutEditForm: React.FC<AccountEditFormProps> = ({ data, customSubmitButton }) => {
  const { register, formState, handleSubmit, handleSubmitAccountEdit } = useAccountEditForm({ data });

  const formatDateForInput = (date: Date | null | undefined): string => {
    if (!date) return "";
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    const hours = String(d.getHours()).padStart(2, "0");
    const minutes = String(d.getMinutes()).padStart(2, "0");
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  return (
    <form onSubmit={handleSubmit(handleSubmitAccountEdit)} className="space-y-6">
      <input type="hidden" {...register("id")} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <InputLable htmlFor="name" lable="Nome da Empresa" />
          <InputText id="name" placeholder="Nome da empresa..." {...register("name")} />
          <InputError error={formState.errors.name} />
        </div>
        <div>
          <InputLable htmlFor="code" lable="Código" />
          <InputText id="code" placeholder="12345678..." {...register("code")} disabled />
          <InputError error={formState.errors.code} />
        </div>
      </div>
      <div>
        <InputLable htmlFor="subscriptionExpiresAt" lable="Data de Expiração da Mensalidade" />
        <input
          type="datetime-local"
          id="subscriptionExpiresAt"
          defaultValue={formatDateForInput(data.subscriptionExpiresAt)}
          {...register("subscriptionExpiresAt")}
          className="w-full p-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700 transition duration-300"
        />
        <InputError error={formState.errors.subscriptionExpiresAt} />
      </div>
      {customSubmitButton && customSubmitButton}
      {!customSubmitButton && (
        <button type="submit" disabled={formState.isSubmitting} className="w-full py-3 px-4 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300">
          {formState.isSubmitting ? "Processando..." : "Salvar Configurações"}
        </button>
      )}
    </form>
  );
};

export default AccoutEditForm;
