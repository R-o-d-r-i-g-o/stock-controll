"use client";

import { useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";

import { useToast } from "@/hooks";
import { useRouter } from "next/navigation";
import { footSizesList, NavigationPage } from "@/common";

import * as a from "./_actions";
import * as m from "./_models";

const SubmitButton = () => {
  const { pending } = useFormStatus();
  const lable = pending ? "Processando..." : "Cadastrar";

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full py-3 px-4 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
    >
      {lable}
    </button>
  );
};

const ItemCreationForm = () => {
  const { success, failure } = useToast();
  const [state, formAction] = useFormState(a.handleSubmit, m.initalState);

  const router = useRouter();

  const handleFormReponse = () => {
    if (state.message === "success") {
      success("Novo item criado com sucesso!");
      router.push(NavigationPage.Users);
    } else if (state.message !== "") {
      failure(state.message);
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(handleFormReponse, [state]);

  return (
    <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-md">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Novo item
      </h2>
      <form action={formAction}>
        <div className="mb-6">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-600"
          >
            SKU
          </label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Definal um código para o item"
            className="w-full mt-2 p-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-600"
          >
            Preço
          </label>
          <input
            id="price"
            name="price"
            type="number"
            step={0.01}
            placeholder="Digite o preço do item"
            className="w-full mt-2 p-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="roleId"
            className="block text-sm font-medium text-gray-600"
          >
            Tamanho
          </label>
          <select
            id="size"
            name="size"
            className="w-full mt-2 p-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
          >
            {footSizesList?.map((footSize) => (
              <option key={footSize} value={footSize}>
                {footSize}
              </option>
            ))}
          </select>
        </div>
        <SubmitButton />
      </form>
    </div>
  );
};

export default ItemCreationForm;
