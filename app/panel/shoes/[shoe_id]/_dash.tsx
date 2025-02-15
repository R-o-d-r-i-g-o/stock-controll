"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { z } from "zod";

// icons
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import AddTag from "@mui/icons-material/Sell";

// ui
import { Divider, IconButton } from "@mui/material";

// internal
import { updateShoe, deleteShoeById } from "@/services";
import { useToast } from "@/hooks/use-toast";
import * as t from "./_types";
import Table from "./_table";

const shoeUpdateSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  sole: z.string().min(1, "Sola é obrigatória"),
  color: z.string().min(1, "Cor é obrigatória"),
  note: z
    .string()
    .optional()
    .default(() => ""),
});

type ShoeUpdateSchema = z.infer<typeof shoeUpdateSchema>;

const ProductDash = ({ data }: t.DashProps) => {
  const { success, failure } = useToast();
  const router = useRouter();

  const { register, handleSubmit, formState } = useForm<ShoeUpdateSchema>({
    resolver: zodResolver(shoeUpdateSchema),
    defaultValues: {
      name: data.name,
      sole: data.sole,
      color: data.color,
      note: data.note,
    },
  });

  const onSubmit = async (formData: ShoeUpdateSchema) => {
    try {
      await updateShoe({ ...formData, id: data.id });
      success("Calçado atualizado com sucesso!");
      router.push("/panel/shoes");
    } catch (err) {
      console.error(err);
      failure("Erro ao atualizar o calçado. Tente novamente mais tarde.");
    }
  };

  const handleDelete = () => {
    Swal.fire({
      title: "Tem certeza?",
      text: "Essa ação não pode ser desfeita!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sim, deletar!",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      try {
        if (!result.isConfirmed) return;
        await deleteShoeById(data.id);
        success("O item foi deletado com sucesso!");
        router.push("/panel/shoes");
      } catch (err) {
        console.error(err);
        failure("Houve um erro ao deletar o item.");
      }
    });
  };

  const buttonRange = (
    <div className="flex gap-2 items-center justify-center">
      <IconButton
        onClick={() => router.push(`/panel/shoes/${data.id}/items/create`)}
        className=" !bg-green-500 !rounded-2xl !text-white"
      >
        <AddIcon />
      </IconButton>
      <IconButton
        type="submit"
        className=" !bg-blue-500 !rounded-2xl !text-white"
      >
        <EditIcon />
      </IconButton>
      <IconButton
        onClick={handleDelete}
        className="!bg-red-500 !rounded-2xl !text-white"
      >
        <DeleteIcon />
      </IconButton>
      <IconButton
        // onClick={handleDelete}
        className="!bg-yellow-500 !rounded-2xl !text-white"
      >
        <AddTag />
      </IconButton>
    </div>
  );

  return (
    <React.Fragment>
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          {`Detalhes do calçado #${data.id}`}
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-600"
              >
                Nome
              </label>
              <input
                id="name"
                placeholder="Digite o nome do item"
                className="w-full mt-2 p-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700 transition duration-300"
                {...register("name")}
              />
              {formState.errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {formState.errors.name.message}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="sole"
                className="block text-sm font-medium text-gray-600"
              >
                Sola
              </label>
              <input
                id="sole"
                placeholder="Tipo de sola"
                className="w-full mt-2 p-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700 transition duration-300"
                {...register("sole")}
              />
              {formState.errors.sole && (
                <p className="text-red-500 text-sm mt-1">
                  {formState.errors.sole.message}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="color"
                className="block text-sm font-medium text-gray-600"
              >
                Cor
              </label>
              <input
                id="color"
                placeholder="Digite a cor do item"
                className="w-full mt-2 p-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700 transition duration-300"
                {...register("color")}
              />
              {formState.errors.color && (
                <p className="text-red-500 text-sm mt-1">
                  {formState.errors.color.message}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="note"
                className="block text-sm font-medium text-gray-600"
              >
                Nota
              </label>
              <input
                id="note"
                placeholder="Notas sobre o item"
                className="w-full mt-2 p-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700 transition duration-300"
                {...register("note")}
              />
              {formState.errors.note && (
                <p className="text-red-500 text-sm mt-1">
                  {formState.errors.note.message}
                </p>
              )}
            </div>
          </div>
          <Divider sx={{ margin: "20px 0" }} />
          {buttonRange}
        </form>
      </div>
      <Table meta={{ shoeId: data.id }} data={data.items} />
    </React.Fragment>
  );
};

export default ProductDash;
