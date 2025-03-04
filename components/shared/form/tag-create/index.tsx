"use client";

import IdentIcon from "@mui/icons-material/FormatIndentIncrease";

import InputError from "@/components/ui/input-error";
import useTagCreateForm from "./use-tag-create";

const TagCreatePage = () => {
  const {
    register,
    formState,
    handleSubmit,
    handleSubmitTagCreate,
    handleIndentJson,
  } = useTagCreateForm();

  return (
    <form onSubmit={handleSubmit(handleSubmitTagCreate)}>
      <div className="mb-6">
        <label
          htmlFor="tag"
          className="block text-sm font-medium text-gray-600"
        >
          Código da etiqueta
        </label>
        <input
          id="tag"
          placeholder="Digite aqui o código da etiqueta"
          className="w-full mt-2 p-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700 transition duration-300"
          {...register("tag")}
        />
        <InputError error={formState.errors.tag} />
      </div>
      <div className="mb-6">
        <label
          htmlFor="metadata"
          className="block mb-2 text-sm font-medium text-gray-600"
        >
          Metadata do produto
        </label>
        <div className="relative">
          <textarea
            id="metadata"
            placeholder="Digite aqui os meta-dados"
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
        className="w-full py-3 px-4 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
      >
        {formState.isSubmitting ? "Processando..." : "Cadastrar"}
      </button>
    </form>
  );
};

export default TagCreatePage;
