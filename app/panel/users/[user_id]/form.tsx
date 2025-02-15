"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { z } from "zod";

import { useToast } from "@/hooks";
import { updateUser } from "@/services";
import { NavigationPage } from "@/common";

import DeleteButton from "./delete";

const updateUserSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  email: z.string().email("Email inválido").min(1, "Email é obrigatório"),
  roleId: z.coerce.number().min(1, "Selecione um cargo"),
  password: z
    .string()
    .min(6, "Senha deve ter pelo menos 6 caracteres")
    .optional()
    .or(z.literal("")),
});

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

type UpdateUserSchema = z.infer<typeof updateUserSchema>;

const UserCreateForm = ({ roles, user }: UserCreateFormProps) => {
  const { success, failure } = useToast();
  const router = useRouter();

  const { register, handleSubmit, formState } = useForm<UpdateUserSchema>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      name: user.name,
      email: user.email,
      roleId: user.roleId,
    },
  });

  const onSubmit = async (data: UpdateUserSchema) => {
    try {
      await updateUser({ ...data, id: user.id });
      success("Usuário atualizado com sucesso!");
      router.push(NavigationPage.Users);
    } catch (err) {
      console.error(err);
      failure("Erro ao atualizar usuário. Tente novamente.");
    }
  };

  return (
    <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-md">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
        {`Editar usuário #${user.id}`}
      </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
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
          className="w-full py-3 px-4 mb-4 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
        >
          {formState.isSubmitting ? "Processando..." : "Editar"}
        </button>
        <DeleteButton userId={user.id} />
      </form>
    </div>
  );
};

export default UserCreateForm;
