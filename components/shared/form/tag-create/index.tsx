"use client";

import InputText from "@/components/ui/input-text";
import InputLable from "@/components/ui/input-lable";
import InputError from "@/components/ui/input-error";
import InputTextarea from "@/components/ui/input-textarea";
import useTagCreateForm from "./use-tag-create";

type TagCreatePageProps = {
  shoeId: number;
};

const TagCreatePage = ({ shoeId }: TagCreatePageProps) => {
  const { register, formState, handleSubmit, handleSubmitTagCreate } = useTagCreateForm({ shoeId });

  return (
    <form onSubmit={handleSubmit(handleSubmitTagCreate)}>
      <div className="mb-6">
        <InputLable htmlFor="tag" lable="Cód. Etiqueta" />
        <InputText id="tag" isScanner placeholder="código..." {...register("tag")} />
        <InputError error={formState.errors.tag} />
      </div>
      <div className="mb-6">
        <InputLable htmlFor="metadata" lable="Metadados" />
        <InputTextarea id="metadata" rows={6} allowIndent placeholder="Digite aqui os meta-dados" {...register("metadata")} />
        <InputError error={formState.errors.metadata} />
      </div>
      <button type="submit" disabled={formState.isSubmitting} className="w-full py-3 px-4 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300">
        {formState.isSubmitting ? "Processando..." : "Cadastrar"}
      </button>
    </form>
  );
};

export default TagCreatePage;
