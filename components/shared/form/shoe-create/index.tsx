"use client";

import InputError from "@/components/ui/input-error";
import useShoeCreateForm from "./use-shoe-create";

const ShoeCreateForm = () => {
  const { register, formState, handleSubmit, handleSubmitCreateShoe } =
    useShoeCreateForm();

  return (
    <form onSubmit={handleSubmit(handleSubmitCreateShoe)}>
      <div className="mb-6">
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-600"
        >
          Nome
        </label>
        <input
          id="name"
          placeholder="Digite o nome do produto"
          className="w-full mt-2 p-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700 transition duration-300 "
          {...register("name")}
        />
        <InputError error={formState.errors.name} />
      </div>
      <div className="mb-6">
        <label
          htmlFor="sole"
          className="block text-sm font-medium text-gray-600"
        >
          Sola
        </label>
        <input
          id="sole"
          placeholder="Tipo de sola"
          className="w-full mt-2 p-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700 transition duration-300"
          {...register("sole")}
        />
        <InputError error={formState.errors.sole} />
      </div>
      <div className="mb-6">
        <label
          htmlFor="color"
          className="block text-sm font-medium text-gray-600"
        >
          Cor
        </label>
        <input
          id="color"
          placeholder="Digite a cor do produto"
          className="w-full mt-2 p-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700 transition duration-300"
          {...register("color")}
        />
        <InputError error={formState.errors.color} />
      </div>
      <div className="mb-6">
        <label
          htmlFor="note"
          className="block text-sm font-medium text-gray-600"
        >
          Nota
        </label>
        <input
          id="note"
          placeholder="Notas sobre o produto"
          className="w-full mt-2 p-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700 transition duration-300"
          {...register("note")}
        />
        <InputError error={formState.errors.note} />
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

export default ShoeCreateForm;
