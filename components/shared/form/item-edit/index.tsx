"use client";

import React from "react";

import InputLable from "@/components/ui/input-lable";
import InputError from "@/components/ui/input-error";
import { footSizesList } from "@/common";
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
  const { register, formState, handleSubmit, handleSubmitEditItem } =
    useItemEditFrom({ item });

  return (
    <form onSubmit={handleSubmit(handleSubmitEditItem)}>
      <div className="mb-6">
        <InputLable htmlFor="sku" lable="SKU" />
        <input
          id="sku"
          placeholder="Defina um código para o item"
          className="w-full mt-2 p-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700 transition duration-300"
          {...register("sku")}
        />
        <InputError error={formState.errors.sku} />
      </div>
      <div className="mb-6">
        <InputLable htmlFor="price" lable="Preço" />
        <input
          id="price"
          type="number"
          placeholder="Digite o preço do item"
          className="w-full mt-2 p-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700 transition duration-300"
          {...register("price")}
        />
        <InputError error={formState.errors.price} />
      </div>
      <div className="mb-6">
        <InputLable htmlFor="size" lable="Tamanho" />
        <select
          id="size"
          className="w-full mt-2 p-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700 transition duration-300"
          {...register("size")}
        >
          {footSizesList?.map((footSize) => (
            <option key={footSize} value={footSize}>
              {footSize}
            </option>
          ))}
        </select>
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

export default ItemEditForm;
