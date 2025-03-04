"use client";

import React from "react";

import InputText from "@/components/ui/input-text";
import InputLable from "@/components/ui/input-lable";
import InputError from "@/components/ui/input-error";
import InputTextarea from "@/components/ui/input-textarea";
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
  const { register, formState, handleSubmit, handleSubmitTagEdit } =
    useTagEditForm({ tag });

  return (
    <form onSubmit={handleSubmit(handleSubmitTagEdit)}>
      <div className="mb-6">
        <InputLable htmlFor="sku" lable="Cód. Etiqueta" />
        <InputText id="sku" placeholder="código..." {...register("sku")} />
        <InputError error={formState.errors.sku} />
      </div>
      <div className="mb-6">
        <InputLable htmlFor="metadata" lable="Metadados" />
        <InputTextarea
          id="metadata"
          rows={6}
          allowIndent
          placeholder="Digite os meta-dados da tag"
          {...register("metadata")}
        />
        <InputError error={formState.errors.metadata} />
      </div>
      <button
        type="submit"
        disabled={formState.isSubmitting}
        className="w-full py-3 px-4 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
      >
        {formState.isSubmitting ? "Processando..." : "Salvar Alterações"}
      </button>
    </form>
  );
};

export default TagEditForm;
