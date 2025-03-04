"use client";

import InputText from "@/components/ui/input-text";
import InputLable from "@/components/ui/input-lable";
import InputError from "@/components/ui/input-error";
import InputSelect from "@/components/ui/input-select";
import useUserCreateForm from "./use-user-create";

type UserCreateFormProps = {
  roles: {
    id: number;
    name: string;
  }[];
};

const UserCreateForm = ({ roles }: UserCreateFormProps) => {
  const { register, formState, handleSubmit, handleCrateUser, roleOptions } =
    useUserCreateForm({ roles });

  return (
    <form onSubmit={handleSubmit(handleCrateUser)}>
      <div className="mb-6">
        <InputLable htmlFor="name" lable="Nome" />
        <InputText id="name" placeholder="John..." {...register("name")} />
        <InputError error={formState.errors.name} />
      </div>
      <div className="mb-6">
        <InputLable htmlFor="email" lable="E-mail" />
        <InputText
          id="email"
          placeholder="john@example.com"
          {...register("email")}
        />
        <InputError error={formState.errors.email} />
      </div>
      <div className="mb-6">
        <InputLable htmlFor="password" lable="Senha" />
        <InputText
          id="password"
          isPassword
          placeholder="****"
          {...register("password")}
        />
        <InputError error={formState.errors.password} />
      </div>
      <div className="mb-6">
        <InputLable htmlFor="roleId" lable="Cargo" />
        <InputSelect options={roleOptions} {...register("roleId")} />
        <InputError error={formState.errors.roleId} />
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

export default UserCreateForm;
