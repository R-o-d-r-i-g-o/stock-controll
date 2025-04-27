"use client";

import React from "react";

import InputText from "@/components/ui/input-text";
import InputLable from "@/components/ui/input-lable";
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
        <InputLable htmlFor="email" lable="E-mail" />
        <InputText id="email" placeholder="john@example.com" {...register("email")} />
        <InputError error={formState.errors.email} />
      </div>
      <div className="mb-6">
        <InputLable htmlFor="password" lable="Senha" />
        <InputText id="password" isPassword placeholder="****" {...register("password")} />
        <InputError error={formState.errors.password} />
      </div>
      <button type="submit" disabled={formState.isSubmitting} className="w-full py-3 px-4 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300">
        {formState.isSubmitting ? "Processando..." : "Entrar"}
      </button>
    </form>
  );
};

export default LoginForm;
