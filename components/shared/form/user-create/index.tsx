"use client";

import useUserCreateForm from "./use-user-create";

type UserCreateFormProps = {
  roles: Array<{
    id: number;
    name: string;
  }>;
};

const UserCreateForm = ({ roles }: UserCreateFormProps) => {
  const { register, formState, handleSubmit, handleCrateUser } =
    useUserCreateForm();

  return (
    <form onSubmit={handleSubmit(handleCrateUser)}>
      <div className="mb-6">
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-600"
        >
          Nome
        </label>
        <input
          id="name"
          placeholder="Digite seu nome completo"
          className="w-full mt-2 p-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700 transition duration-300"
          {...register("name")}
        />
        {formState.errors.name && (
          <span className="text-red-600 text-sm">
            {formState.errors.name.message}
          </span>
        )}
      </div>
      <div className="mb-6">
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-600"
        >
          Email
        </label>
        <input
          id="email"
          placeholder="Digite seu email"
          className="w-full mt-2 p-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700 transition duration-300"
          {...register("email")}
        />
        {formState.errors.email && (
          <span className="text-red-600 text-sm">
            {formState.errors.email.message}
          </span>
        )}
      </div>
      <div className="mb-6">
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-600"
        >
          Senha
        </label>
        <input
          id="password"
          placeholder="Digite sua senha"
          className="w-full mt-2 p-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700 transition duration-300"
          {...register("password")}
        />
        {formState.errors.password && (
          <span className="text-red-600 text-sm">
            {formState.errors.password.message}
          </span>
        )}
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
          className="w-full mt-2 p-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700 transition duration-300"
          {...register("roleId")}
        >
          <option value="" disabled>
            Selecione o cargo
          </option>
          {roles?.map((r) => (
            <option key={r.id} value={r.id}>
              {r.name}
            </option>
          ))}
        </select>
        {formState.errors.roleId && (
          <span className="text-red-600 text-sm">
            {formState.errors.roleId.message}
          </span>
        )}
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
