"use client";

import React from "react";
import useLogin from "./use-login";

type LoginFormProps = {
  callbackUrl?: string;
};

const LoginForm: React.FC<LoginFormProps> = ({ callbackUrl }) => {
  const { register, formState, handleSubmit, onSubmit } = useLogin({
    callbackUrl,
  });

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
