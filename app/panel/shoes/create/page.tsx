"use client"

import { useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";

import { useToast } from "@/hooks";
import { useRouter } from "next/navigation";
import { NavigationPage } from "@/common";

import * as a from './_actions'
import * as m from './_models'

const SubmitButton = () => {
  const { pending } = useFormStatus()
  const lable = pending ? "Processando..." : "Cadastrar"

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full py-3 px-4 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
    >
      {lable}
    </button>
  )
}

const UserCreateForm = () => {
  const { success, failure } = useToast()
  const [state, formAction] = useFormState(a.handleCreateCategorySubmit, m.initialState)

  const router = useRouter()

  const handleFormReponse = () => {
    if (state.message === "success") {
      success("Novo calçado criado com sucesso!")
      router.push(NavigationPage.Category)
    }
    else if (state.message !== "") {
      failure(state.message)
    }
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(handleFormReponse, [state])

  return (
    <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-md">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Novo Calçado</h2>

      <form action={formAction}>
        <div className="mb-6">
          <label htmlFor="name" className="block text-sm font-medium text-gray-600">Nome</label>
          <input
            id="name"
            name="name"
            placeholder="Digite o nome do produto"
            className="w-full mt-2 p-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="sole" className="block text-sm font-medium text-gray-600">Sola</label>
          <input
            id="sole"
            name="sole"
            placeholder="Tipo de sola"
            className="w-full mt-2 p-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="color" className="block text-sm font-medium text-gray-600">Cor</label>
          <input
            id="color"
            name="color"
            placeholder="Digite a cor do produto"
            className="w-full mt-2 p-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="note" className="block text-sm font-medium text-gray-600">Nota</label>
          <input
            id="note"
            name="note"
            placeholder="Notas sobre o produto"
            className="w-full mt-2 p-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
          />
        </div>
        <SubmitButton />
      </form>
    </div>
  );
};

export default UserCreateForm;
