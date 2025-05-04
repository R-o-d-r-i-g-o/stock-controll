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
    payment: boolean;
  };
};

const AccoutEditForm: React.FC<AccountEditFormProps> = ({ data, customSubmitButton }) => {
  const { register, formState, handleSubmit, handleSubmitAccountEdit } = useAccountEditForm({ data });

  return (
    <form onSubmit={handleSubmit(handleSubmitAccountEdit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <InputLable htmlFor="name" lable="Nome" />
          <InputText id="name" placeholder="compania..." {...register("name")} />
          <InputError error={formState.errors.name} />
        </div>
        <div>
          <InputLable htmlFor="code" lable="Código" />
          <InputText id="code" placeholder="12345678..." {...register("code")} disabled />
          <InputError error={formState.errors.code} />
        </div>
      </div>
      {customSubmitButton && customSubmitButton}
      {!customSubmitButton && (
        <button type="submit" disabled={formState.isSubmitting} className="w-full py-3 px-4 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300">
          {formState.isSubmitting ? "Processando..." : "Editar"}
        </button>
      )}
    </form>
  );
};

export default AccoutEditForm;
