"use client";

import React from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { z } from "zod";

import { useRouter, useSearchParams } from "next/navigation";
import { useToast } from "@/hooks";

const loginSchema = z.object({
  email: z.string().email("Digite um email válido"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
});

type LoginSchema = z.infer<typeof loginSchema>;

const LoginForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { register, handleSubmit, formState } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const { failure } = useToast();

  const onSubmit = async (data: LoginSchema) => {
    try {
      const auth = await signIn("credentials", { ...data, redirect: false });
      if (!auth || !auth.ok) throw new Error();

      router.push(searchParams.get("callbackUrl") ?? "/panel");
    } catch (err) {
      console.error(err);
      failure("Usuário ou senha incorretos.");
    }
  };

  return (
    <React.Fragment>
      <form onSubmit={handleSubmit(onSubmit)}>
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
            <p className="text-red-500 text-sm mt-1">
              {formState.errors.email.message}
            </p>
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
            type="password"
            placeholder="Digite sua senha"
            className="w-full mt-2 p-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700 transition duration-300"
            {...register("password")}
          />
          {formState.errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {formState.errors.password.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={formState.isSubmitting}
          className="w-full py-3 px-4 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
        >
          {formState.isSubmitting ? "Processando..." : "Entrar"}
        </button>
      </form>
    </React.Fragment>
  );
};
export default LoginForm;
