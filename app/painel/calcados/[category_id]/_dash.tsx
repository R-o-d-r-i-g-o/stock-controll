'use client';

import React, { useEffect } from 'react';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';

import { Divider, IconButton } from '@mui/material';
import { useFormState, useFormStatus } from "react-dom";

import * as a from './_actions'

import * as t from './_types'
import Table from './_table'
import { NavigationPage } from '@/common';
import Swal from 'sweetalert2';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from "next/navigation";

import * as svc from '@/services'

const ProductDash = ({ data }: t.DashProps) => {
  const initialState = {
    message: "",
    fieldValues: {
      id: data.id.toString(),
      name: data.name,
      sole: data.sole,
      color: data.color,
      note: data.note,
    }
  }

  const { pending } = useFormStatus()
  const [state, formAction] = useFormState(a.handleEditCategorySubmit, initialState)

  const handleFormReponse = () => {
    if (state.message === "success")
      success("Calçado atualizado com sucesso!")

    else if (state.message !== "")
      failure(state.message)
  }

  const router = useRouter()
  const { success, failure } = useToast()

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

        await svc.deleteCategoryById(data.id)
        success("O Produto foi deletado com sucesso!")
        router.push(NavigationPage.Category)
      }
      catch (err) {
        console.error(err)
        failure("Houve um erro ao deletar o produto.")
      }
    })
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(handleFormReponse, [state])

  return (
    <React.Fragment>
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          {`Detalhes do calçado #${data.id}`}
        </h2>
        <form action={formAction} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-600">Nome</label>
              <input
                id="name"
                name="name"
                defaultValue={data.name}
                placeholder="Digite o nome do produto"
                className="w-full mt-2 p-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
              />
            </div>
            <div>
              <label htmlFor="sole" className="block text-sm font-medium text-gray-600">Sola</label>
              <input
                id="sole"
                name="sole"
                defaultValue={data.sole}
                placeholder="Tipo de sola"
                className="w-full mt-2 p-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
              />
            </div>
            <div>
              <label htmlFor="color" className="block text-sm font-medium text-gray-600">Cor</label>
              <input
                id="color"
                name="color"
                defaultValue={data.color}
                placeholder="Digite a cor do produto"
                className="w-full mt-2 p-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
              />
            </div>
            <div>
              <label htmlFor="note" className="block text-sm font-medium text-gray-600">Nota</label>
              <input
                id="note"
                name="note"
                defaultValue={data.note}
                placeholder="Notas sobre o produto"
                className="w-full mt-2 p-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
              />
            </div>
          </div>
          <Divider sx={{ margin: '20px 0' }} />
          <div className="flex gap-2 items-center justify-center">
            <IconButton
              onClick={() => router.push(`/painel/calcados/${data.id}/produtos/criar`)}
              disabled={pending}
              className=" !bg-green-500 !rounded-2xl !text-white">
              <AddIcon />
            </IconButton>
            <IconButton
              type='submit'
              disabled={pending}
              className=" !bg-blue-500 !rounded-2xl !text-white"
            >
              <EditIcon />
            </IconButton>
            <IconButton
              onClick={handleDelete}
              disabled={pending}
              className="!bg-red-500 !rounded-2xl !text-white"
            >
              <DeleteIcon />
            </IconButton>
          </div>
        </form>
      </div >
      <Table
        meta={{ categoryId: data.id }}
        data={data.shoes}
      />
    </React.Fragment >
  );
};

export default ProductDash;
