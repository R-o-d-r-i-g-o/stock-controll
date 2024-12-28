"use client"

import { Fragment, useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";

import * as svc from "@/services"
import Swal from 'sweetalert2'

import { useToast } from "@/hooks";
import { useRouter } from "next/navigation";

import * as a from './_actions'
import { footSizesList } from "@/common";
// import * as m from './_models'

type UserCreateFormProps = {
  shoe: {
    id: number;
    sku: string;
    size: number;
    price: string;
    categoryId: number;
    createdAt: string;
    deletedAt: string | null;
  }
}

const FormButtons = ({ shoeId }: { shoeId: number }) => {
  const { success, failure } = useToast()
  const router = useRouter()

  const { pending } = useFormStatus()
  const lable = pending ? "Processando..." : "Cadastrar"

  const handleDelete = () => {
    Swal.fire({
      title: 'Tem certeza?',
      text: 'Essa ação não pode ser desfeita!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sim, deletar!',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      try {
        if (!result.isConfirmed)
          return

        await svc.deleteShoeById(shoeId)
        success("O usuário foi deletado com sucesso!")
        router.back()
      }
      catch (err) {
        console.error(err)
        failure("Houve um erro ao deletar o usuário.")
      }
    })
  }

  return (
    <Fragment>
      <button
        type="submit"
        disabled={pending}
        className="w-full py-3 px-4 mb-4 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
      >
        {lable}
      </button>
      <button
        type="button"
        onClick={handleDelete}
        className="w-full py-3 px-4 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-300"
      >
        Deletar produto
      </button>
    </Fragment>
  )
}

const UserCreateForm = ({ shoe: item }: UserCreateFormProps) => {
  const initialState = {
    message: "",
    fieldValues: {
      ...item,
      id: item.id.toString(),
      size: item.size.toString(),
      price: item.price.toString(),
      categoryId: item.categoryId.toString(),
    }
  }

  const { success, failure } = useToast()
  const [state, formAction] = useFormState(a.handleSubmit, initialState)

  const router = useRouter()

  const handleFormReponse = () => {
    if (state.message === "success") {
      success("Produto atualizado com sucesso!")
      router.push(`painel/calcados/${item.categoryId}`)
    }
    else if (state.message !== "") {
      failure(state.message)
    }
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(handleFormReponse, [state])

  return (
    <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-md">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
        {`Editar item #${item.id}`}
      </h2>
      <form action={formAction}>
        <div className="mb-6">
          <label htmlFor="name" className="block text-sm font-medium text-gray-600">SKU</label>
          <input
            id="name"
            name="name"
            type="text"
            defaultValue={item.sku}
            placeholder="Definal um código para o item"
            className="w-full mt-2 p-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-medium text-gray-600">Preço</label>
          <input
            id="price"
            name="price"
            type="number"
            step={0.01}
            defaultValue={item.price}
            placeholder="Digite o preço do item"
            className="w-full mt-2 p-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="role_id" className="block text-sm font-medium text-gray-600">Tamanho</label>
          <select
            id="size"
            name="size"
            className="w-full mt-2 p-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
          >
            {footSizesList?.map(footSize => (
              <option
                key={footSize}
                value={footSize}
                selected={footSize === item.size}
              >
                {footSize}
              </option>
            ))}
          </select>
        </div>
        <FormButtons shoeId={item.id} />
      </form>
    </div>
  );
};

export default UserCreateForm;
