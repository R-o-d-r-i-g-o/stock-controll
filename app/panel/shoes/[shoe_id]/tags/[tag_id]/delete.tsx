"use client";

import React from "react";

import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

import { useToast } from "@/lib/hooks";
import { deleteUser } from "@/lib/services";

type DeleteButtonProps = {
  tagId: number;
};

const DeleteButton = ({ tagId }: DeleteButtonProps) => {
  const { success, failure } = useToast();
  const router = useRouter();

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

        await deleteUser(tagId);
        success("A etiqueta foi deletada com sucesso!");
        router.push("/panel/users");
      } catch (err) {
        console.error(err);
        failure("Houve um erro ao deletar a etiqueta.");
      }
    });
  };

  return (
    <button
      type="button"
      onClick={handleDelete}
      className="w-full py-3 px-4 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-300"
    >
      Deletar Usuário
    </button>
  );
};

export default DeleteButton;
