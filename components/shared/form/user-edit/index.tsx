"use client";

import InputText from "@/components/ui/input-text";
import InputLable from "@/components/ui/input-lable";
import InputError from "@/components/ui/input-error";
import InputSelect from "@/components/ui/input-select";
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
  const { register, formState, handleSubmit, handleSubmitEditUser, roleOptions } = useUserEditForm({ roles, user });

  return (
    <form onSubmit={handleSubmit(handleSubmitEditUser)}>
      <div className="mb-6">
        <InputLable htmlFor="name" lable="Nome" />
        <InputText id="name" placeholder="John..." {...register("name")} />
        <InputError error={formState.errors.name} />
      </div>
      <div className="mb-6">
        <InputLable htmlFor="email" lable="E-mail" />
        <InputText id="email" placeholder="john@example.com" {...register("email")} />
        <InputError error={formState.errors.email} />
      </div>
      <div className="mb-6">
        <InputLable htmlFor="password" lable="Senha" />
        <InputText id="password" isPassword placeholder="****" {...register("password")} />
        <InputError error={formState.errors.password} />
      </div>
      <div className="mb-6">
        <InputLable htmlFor="roleId" lable="Cargo" />
        <InputSelect options={roleOptions} {...register("roleId")} />
        <InputError error={formState.errors.roleId} />
      </div>
      <button type="submit" disabled={formState.isSubmitting} className="w-full py-3 px-4 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300">
        {formState.isSubmitting ? "Processando..." : "Editar"}
      </button>
    </form>
  );
};

export default UserEditForm;
