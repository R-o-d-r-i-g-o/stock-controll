"use client";

import { Fragment, useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";

import { deleteUser } from "@/services";
import Swal from "sweetalert2";

import { useToast } from "@/hooks";
import { useRouter } from "next/navigation";
import { NavigationPage } from "@/common";

import * as a from "./_actions";
import * as m from "./_models";

type UserCreateFormProps = {
  user: {
    id: number;
    name: string;
    email: string;
    roleId: number;
    createdAt: string;
    deletedAt: string | null;
  };
  roles: Array<{
    id: number;
    name: string;
  }>;
};

const FormButtons = ({ userId }: { userId: number }) => {
  const { success, failure } = useToast();
  const router = useRouter();

  const { pending } = useFormStatus();
  const lable = pending ? "Processando..." : "Editar";

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

        await deleteUser(userId);
        success("O usuário foi deletado com sucesso!");
        router.push(NavigationPage.Users);
      } catch (err) {
        console.error(err);
        failure("Houve um erro ao deletar o usuário.");
      }
    });
  };

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
        Deletar Usuário
      </button>
    </Fragment>
  );
};

const UserCreateForm = ({ roles, user }: UserCreateFormProps) => {
  const initialState = m.initalState;
  initialState.fieldValues.id = user.id.toString();

  const { success, failure } = useToast();
  const [state, formAction] = useFormState(a.handleSubmit, initialState);

  const router = useRouter();

  const handleFormReponse = () => {
    if (state.message === "success") {
      success("Usuário atualizado com sucesso!");
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
        {`Editar usuário #${user.id}`}
      </h2>
      <form action={formAction}>
        <div className="mb-6">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-600"
          >
            Nome
          </label>
          <input
            key={user.name}
            type="text"
            id="name"
            name="name"
            defaultValue={user.name}
            placeholder="Digite seu nome completo"
            className="w-full mt-2 p-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-600"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            autoComplete="off"
            defaultValue={user.email}
            placeholder="Digite seu email"
            className="w-full mt-2 p-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-600"
          >
            Senha
          </label>
          <input
            type="password"
            id="password"
            name="password"
            autoComplete="off"
            placeholder="Digite sua senha"
            className="w-full mt-2 p-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="roleId"
            className="block text-sm font-medium text-gray-600"
          >
            Cargo
          </label>
          <select
            id="roleId"
            name="roleId"
            className="w-full mt-2 p-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
          >
            {roles?.map((r) => (
              <option key={r.id} value={r.id} selected={r.id === user.roleId}>
                {r.name}
              </option>
            ))}
          </select>
        </div>
        <FormButtons userId={user.id} />
      </form>
    </div>
  );
};

export default UserCreateForm;
