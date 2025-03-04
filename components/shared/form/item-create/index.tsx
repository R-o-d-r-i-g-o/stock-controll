"use client";

import React from "react";

import InputText from "@/components/ui/input-text";
import InputLable from "@/components/ui/input-lable";
import InputError from "@/components/ui/input-error";
import InputSelect from "@/components/ui/input-select";
import useItemCreateForm from "./use-item-create";

type ItemCreateformProps = {
  shoeId: number;
};

const ItemCreateForm: React.FC<ItemCreateformProps> = ({ shoeId }) => {
  const {
    register,
    formState,
    handleSubmit,
    handleSubmitTagEdit,
    footSizeOptions,
  } = useItemCreateForm({ shoeId });

  return (
    <form onSubmit={handleSubmit(handleSubmitTagEdit)}>
      <div className="mb-6">
        <InputLable htmlFor="sku" lable="SKU" />
        <InputText id="sku" placeholder="Cód. do item" {...register("sku")} />
        <InputError error={formState.errors.sku} />
      </div>
      <div className="mb-6">
        <InputLable htmlFor="price" lable="Preço" />
        <InputText
          id="price"
          step={0.01}
          placeholder="12.0"
          {...register("price")}
        />
        <InputError error={formState.errors.price} />
      </div>
      <div className="mb-6">
        <InputLable htmlFor="size" lable="Tamanho" />
        <InputSelect options={footSizeOptions} {...register("size")} />
        <InputError error={formState.errors.size} />
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

export default ItemCreateForm;
