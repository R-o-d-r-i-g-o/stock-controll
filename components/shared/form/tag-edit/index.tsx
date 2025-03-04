"use client";

import React from "react";

import IdentIcon from "@mui/icons-material/FormatIndentIncrease";

import InputText from "@/components/ui/input-text";
import InputLable from "@/components/ui/input-lable";
import InputError from "@/components/ui/input-error";
import useTagEditForm from "./use-tag-edit";

type TagEditFormProps = {
  tag: {
    id: number;
    sku: string;
    shoeId: number;
    userId: number;
    metadata: { [key: string]: object };
    createdAt: Date;
    deletedAt: Date | null;
  };
};

const TagEditForm: React.FC<TagEditFormProps> = ({ tag }) => {
  const {
    register,
    formState,
    handleSubmit,
    handleSubmitTagEdit,
    handleIndentJson,
  } = useTagEditForm({ tag });

  return (
    <form onSubmit={handleSubmit(handleSubmitTagEdit)}>
      <div className="mb-6">
        <InputLable htmlFor="sku" lable="Cód. Etiqueta" />
        <InputText id="sku" placeholder="código..." {...register("sku")} />
        <InputError error={formState.errors.sku} />
      </div>
      <div className="mb-6">
        <InputLable htmlFor="metadata" lable="Metadados" />
        <div className="relative">
          <textarea
            id="metadata"
            placeholder="Digite os meta-dados da tag"
            className="w-full overflow-y-hidden p-3 pr-10 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700 transition duration-300"
            rows={6}
            {...register("metadata")}
          />
          <button
            type="button"
            onClick={handleIndentJson}
            className="absolute top-2 p-1 right-2 bg-gray-200 text-gray-600 rounded-lg hover:bg-gray-300 focus:outline-none"
          >
            <IdentIcon fontSize="small" />
          </button>
        </div>
        <InputError error={formState.errors.metadata} />
      </div>
      <button
        type="submit"
        disabled={formState.isSubmitting}
        className="w-full py-3 px-4 mb-4 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
      >
        {formState.isSubmitting ? "Processando..." : "Salvar Alterações"}
      </button>
    </form>
  );
};

export default TagEditForm;
