"use client";

import InputLable from "@/components/ui/input-lable";
import InputError from "@/components/ui/input-error";
import useUserEditForm from "./use-user-edit";

type UserEditFormProps = {
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

const UserEditForm = ({ roles, user }: UserEditFormProps) => {
  const { register, formState, handleSubmit, handleSubmitEditUser } =
    useUserEditForm({ user });

  return (
    <form onSubmit={handleSubmit(handleSubmitEditUser)}>
      <div className="mb-6">
        <InputLable htmlFor="name" lable="Nome" />
        <input
          id="name"
          placeholder="Digite seu nome completo"
          className="w-full mt-2 p-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700 transition duration-300"
          {...register("name")}
        />
        <InputError error={formState.errors.name} />
      </div>
      <div className="mb-6">
        <InputLable htmlFor="email" lable="E-mail" />
        <input
          id="email"
          placeholder="Digite seu email"
          className="w-full mt-2 p-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700 transition duration-300"
          {...register("email")}
        />
        <InputError error={formState.errors.email} />
      </div>
      <div className="mb-6">
        <InputLable htmlFor="password" lable="Senha" />
        <input
          id="password"
          placeholder="Digite sua senha"
          className="w-full mt-2 p-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700 transition duration-300"
          {...register("password")}
        />
        <InputError error={formState.errors.password} />
      </div>
      <div className="mb-6">
        <InputLable htmlFor="roleId" lable="Cargo" />
        <select
          id="roleId"
          className="w-full mt-2 p-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700 transition duration-300"
          {...register("roleId")}
        >
          {roles?.map((r) => (
            <option key={r.id} value={r.id}>
              {r.name}
            </option>
          ))}
        </select>
        <InputError error={formState.errors.roleId} />
      </div>
      <button
        type="submit"
        disabled={formState.isSubmitting}
        className="w-full py-3 px-4 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
      >
        {formState.isSubmitting ? "Processando..." : "Editar"}
      </button>
    </form>
  );
};

export default UserEditForm;
