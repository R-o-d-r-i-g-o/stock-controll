"use client";

import React from "react";

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
        <label
          htmlFor="sku"
          className="block text-sm font-medium text-gray-600"
        >
          SKU
        </label>
        <input
          id="sku"
          placeholder="Defina um código para o item"
          className="w-full mt-2 p-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700 transition duration-300"
          {...register("sku")}
        />
        {formState.errors.sku && (
          <p className="text-red-600 text-sm">{formState.errors.sku.message}</p>
        )}
      </div>
      <div className="mb-6">
        <label
          htmlFor="price"
          className="block text-sm font-medium text-gray-600"
        >
          Preço
        </label>
        <input
          id="price"
          type="number"
          placeholder="Digite o preço do item"
          className="w-full mt-2 p-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700 transition duration-300"
          {...register("price")}
        />
        {formState.errors.price && (
          <p className="text-red-600 text-sm">
            {formState.errors.price.message}
          </p>
        )}
      </div>
      <div className="mb-6">
        <label
          htmlFor="size"
          className="block text-sm font-medium text-gray-600"
        >
          Tamanho
        </label>
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
        {formState.errors.size && (
          <p className="text-red-600 text-sm">
            {formState.errors.size.message}
          </p>
        )}
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
