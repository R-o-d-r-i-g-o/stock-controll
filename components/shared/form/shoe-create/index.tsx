"use client";

import InputText from "@/components/ui/input-text";
import InputLable from "@/components/ui/input-lable";
import InputError from "@/components/ui/input-error";
import useShoeCreateForm from "./use-shoe-create";

const ShoeCreateForm = () => {
  const { register, formState, handleSubmit, handleSubmitCreateShoe } =
    useShoeCreateForm();

  return (
    <form onSubmit={handleSubmit(handleSubmitCreateShoe)}>
      <div className="mb-6">
        <InputLable htmlFor="name" lable="Nome" />
        <InputText id="name" placeholder="bota..." {...register("name")} />
        <InputError error={formState.errors.name} />
      </div>
      <div className="mb-6">
        <InputLable htmlFor="sole" lable="Sola" />
        <InputText id="sole" placeholder="madeira..." {...register("sole")} />
        <InputError error={formState.errors.sole} />
      </div>
      <div className="mb-6">
        <InputLable htmlFor="color" lable="Cor" />
        <InputText id="color" placeholder="verde..." {...register("color")} />
        <InputError error={formState.errors.color} />
      </div>
      <div className="mb-6">
        <InputLable htmlFor="note" lable="Nota" />
        <InputText id="note" placeholder="Obs..." {...register("note")} />
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
