"use client";

import InputError from "@/components/ui/input-error";
import useShoeEditForm from "./use-shoe-edit";

type ShoeEditFormProps = {
  customSubmitButton?: React.ReactNode;
  data: {
    id: number;
    name: string;
    sole: string;
    color: string;
    note: string;
    createdAt: string;
    deletedAt: string | null;
  };
};

const ShoeEditForm = ({ data, customSubmitButton }: ShoeEditFormProps) => {
  const { register, formState, handleSubmit, handleSubmitUserEdit } =
    useShoeEditForm({ data });

  return (
    <form onSubmit={handleSubmit(handleSubmitUserEdit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-600"
          >
            Nome
          </label>
          <input
            id="name"
            placeholder="Digite o nome do item"
            className="w-full mt-2 p-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700 transition duration-300"
            {...register("name")}
          />
          <InputError error={formState.errors.name} />
        </div>
        <div>
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
        <div>
          <label
            htmlFor="color"
            className="block text-sm font-medium text-gray-600"
          >
            Cor
          </label>
          <input
            id="color"
            placeholder="Digite a cor do item"
            className="w-full mt-2 p-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700 transition duration-300"
            {...register("color")}
          />
          <InputError error={formState.errors.color} />
        </div>
        <div>
          <label
            htmlFor="note"
            className="block text-sm font-medium text-gray-600"
          >
            Nota
          </label>
          <input
            id="note"
            placeholder="Notas sobre o item"
            className="w-full mt-2 p-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700 transition duration-300"
            {...register("note")}
          />
          <InputError error={formState.errors.note} />
        </div>
      </div>
      {customSubmitButton && customSubmitButton}
      {!customSubmitButton && (
        <button
          type="submit"
          disabled={formState.isSubmitting}
          className="w-full py-3 px-4 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
        >
          {formState.isSubmitting ? "Processando..." : "Editar"}
        </button>
      )}
    </form>
  );
};

export default ShoeEditForm;
