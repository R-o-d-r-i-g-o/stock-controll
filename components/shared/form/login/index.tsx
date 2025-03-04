"use client";

import React from "react";

import InputError from "@/components/ui/input-error";
import useLoginForm from "./use-login";

type LoginFormProps = {
  callbackUrl?: string;
};

const LoginForm: React.FC<LoginFormProps> = ({ callbackUrl }) => {
  const { register, formState, handleSubmit, onSubmit } = useLoginForm({
    callbackUrl,
  });

  return (
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
        <InputError error={formState.errors.email} />
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
        <InputError error={formState.errors.password} />
      </div>
      <button
        type="submit"
        disabled={formState.isSubmitting}
        className="w-full py-3 px-4 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
      >
        {formState.isSubmitting ? "Processando..." : "Entrar"}
      </button>
    </form>
  );
};

export default LoginForm;
