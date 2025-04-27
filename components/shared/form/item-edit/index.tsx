"use client";

import React from "react";

import InputText from "@/components/ui/input-text";
import InputLable from "@/components/ui/input-lable";
import InputError from "@/components/ui/input-error";
import InputSelect from "@/components/ui/input-select";
import useItemEditFrom from "./use-item-edit";

type ItemEditFormProps = {
  item: {
    id: number;
    sku: string;
    size: number;
    price: number;
    shoeId: number;
    createdAt: string;
    deletedAt: string | null;
  };
};

const ItemEditForm: React.FC<ItemEditFormProps> = ({ item }) => {
  const { register, formState, handleSubmit, handleSubmitEditItem, footSizeOptions } = useItemEditFrom({ item });

  return (
    <form onSubmit={handleSubmit(handleSubmitEditItem)}>
      <div className="mb-6">
        <InputLable htmlFor="sku" lable="SKU" />
        <InputText id="sku" placeholder="Cód. do item" {...register("sku")} />
        <InputError error={formState.errors.sku} />
      </div>
      <div className="mb-6">
        <InputLable htmlFor="price" lable="Preço" />
        <InputText id="price" type="number" placeholder="12.0" {...register("price")} />
        <InputError error={formState.errors.price} />
      </div>
      <div className="mb-6">
        <InputLable htmlFor="size" lable="Tamanho" />
        <InputSelect {...register("size")} options={footSizeOptions} />
        <InputError error={formState.errors.size} />
      </div>
      <button type="submit" disabled={formState.isSubmitting} className="w-full py-3 px-4 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300">
        {formState.isSubmitting ? "Processando..." : "Cadastrar"}
      </button>
    </form>
  );
};

export default ItemEditForm;
