"use client";

import InputText from "@/components/ui/input-text";
import InputLable from "@/components/ui/input-lable";
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

const ShoeEditForm: React.FC<ShoeEditFormProps> = ({ data, customSubmitButton }) => {
  const { register, formState, handleSubmit, handleSubmitUserEdit } = useShoeEditForm({ data });

  return (
    <form onSubmit={handleSubmit(handleSubmitUserEdit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <InputLable htmlFor="name" lable="Nome" />
          <InputText id="name" placeholder="bota..." {...register("name")} />
          <InputError error={formState.errors.name} />
        </div>
        <div>
          <InputLable htmlFor="sole" lable="Sola" />
          <InputText id="sole" placeholder="madeira..." {...register("sole")} />
          <InputError error={formState.errors.sole} />
        </div>
        <div>
          <InputLable htmlFor="color" lable="Cor" />
          <InputText id="color" placeholder="verde..." {...register("color")} />
          <InputError error={formState.errors.color} />
        </div>
        <div>
          <InputLable htmlFor="note" lable="Nota" />
          <InputText id="note" placeholder="Obs..." {...register("note")} />
          <InputError error={formState.errors.note} />
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

export default ShoeEditForm;
