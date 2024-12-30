"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { z } from "zod";

import { useToast } from "@/hooks";
import { createUser } from "@/services";

const createUserSchema = z.object({
  name: z.string().min(1, "O nome é obrigatório"),
  roleId: z.coerce.number().min(1, "Selecione um cargo"),
  email: z
    .string()
    .email("Digite um email válido")
    .min(1, "O email é obrigatório"),
  password: z
    .string()
    .min(6, "A senha deve ter pelo menos 6 caracteres")
    .min(1, "A senha é obrigatória"),
});

type CreateUserSchema = z.infer<typeof createUserSchema>;

type UserCreateFormProps = {
  roles: Array<{
    id: number;
    name: string;
  }>;
};

const UserCreateForm = ({ roles }: UserCreateFormProps) => {
  const { success, failure } = useToast();
  const router = useRouter();

  const { register, handleSubmit, formState } = useForm<CreateUserSchema>({
    resolver: zodResolver(createUserSchema),
  });

  const handleCrateUser = async (data: CreateUserSchema) => {
    try {
      await createUser(data);
      success("Usuário criado com sucesso!");
      router.push("/panel/users");
    } catch (err) {
      console.error(err);
      failure("Houve um erro ao criar o usuário, tente novamente mais tarde!");
    }
  };

  return (
    <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-md">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Novo Usuário
      </h2>

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
            className="w-full mt-2 p-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
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
            className="w-full mt-2 p-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
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
            className="w-full mt-2 p-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
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
            className="w-full mt-2 p-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
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
          className="w-full py-3 px-4 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
        >
          {formState.isSubmitting ? "Processando..." : "Cadastrar"}
        </button>
      </form>
    </div>
  );
};

export default UserCreateForm;
