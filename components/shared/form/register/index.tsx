"use client";

import React from "react";

import InputText from "@/components/ui/input-text";
import InputLable from "@/components/ui/input-lable";
import InputError from "@/components/ui/input-error";
import useRegisterForm from "./use-register";

const RegisterForm: React.FC = () => {
  const { register, formState, handleSubmit, onSubmit } = useRegisterForm();

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
      <div className="mb-6">
        <InputLable htmlFor="confirmPassword" lable="Confirme sua senha" />
        <InputText id="confirmPassword" isPassword placeholder="****" {...register("confirmPassword")} />
        <InputError error={formState.errors.confirmPassword} />
      </div>
      <div className="mb-6">
        <InputLable htmlFor="companyName" lable="Nome da compania" />
        <InputText id="companyName" placeholder="coca-cola" {...register("companyName")} />
        <InputError error={formState.errors.companyName} />
      </div>
      <button type="submit" disabled={formState.isSubmitting} className="w-full py-3 px-4 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300">
        {formState.isSubmitting ? "Processando..." : "Registrar"}
      </button>
    </form>
  );
};

export default RegisterForm;
