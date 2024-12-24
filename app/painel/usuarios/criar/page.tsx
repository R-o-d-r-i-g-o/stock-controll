'use client'

import { Suspense } from 'react';
import { useForm } from 'react-hook-form';

const useRegister = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data: object) => {
    console.log(data);
    // Adicionar lógica para cadastrar o usuário (exemplo: enviar dados para uma API)
  };

  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
  };
};

const RegisterForm = () => {
  const { register, handleSubmit, errors, onSubmit } = useRegister();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500">
      <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Cadastro de Novo Usuário</h2>

        {/* Exibindo erro geral */}
        {Object.keys(errors).length > 0 && (
          <p className="text-red-500 text-center mb-4">Por favor, corrija os erros abaixo.</p>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Campo de Nome */}
          <div className="mb-6">
            <label htmlFor="name" className="block text-sm font-medium text-gray-600">Nome</label>
            <input
              type="text"
              id="name"
              {...register("name", { required: "O nome é obrigatório" })}
              placeholder="Digite seu nome completo"
              className={`w-full mt-2 p-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300 ${errors.name ? "border-red-500" : "border-gray-300"}`}
            />
            {/* {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )} */}
          </div>

          {/* Campo de Email */}
          <div className="mb-6">
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">Email</label>
            <input
              type="email"
              id="email"
              {...register("email", { required: "O email é obrigatório", pattern: { value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/, message: "Email inválido" } })}
              placeholder="Digite seu email"
              className={`w-full mt-2 p-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300 ${errors.email ? "border-red-500" : "border-gray-300"}`}
            />
            {/* {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )} */}
          </div>

          {/* Campo de Senha */}
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">Senha</label>
            <input
              type="password"
              id="password"
              {...register("password", { required: "A senha é obrigatória", minLength: { value: 6, message: "A senha deve ter no mínimo 6 caracteres" } })}
              placeholder="Digite sua senha"
              className={`w-full mt-2 p-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300 ${errors.password ? "border-red-500" : "border-gray-300"}`}
            />
            {/* {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )} */}
          </div>

          {/* Campo de Confirmação de Senha */}
          <div className="mb-6">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-600">Confirmar Senha</label>
            <input
              type="password"
              id="confirmPassword"
              {...register("confirmPassword", {
                required: "A confirmação de senha é obrigatória",
                // validate: value => value === watch("password") || "As senhas não coincidem"
              })}
              placeholder="Confirme sua senha"
              className={`w-full mt-2 p-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300 ${errors.confirmPassword ? "border-red-500" : "border-gray-300"}`}
            />
            {/* {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
            )} */}
          </div>

          {/* Campo de Cargo */}
          <div className="mb-6">
            <label htmlFor="role" className="block text-sm font-medium text-gray-600">Cargo</label>
            <select
              id="role"
              {...register("role", { required: "O cargo é obrigatório" })}
              className={`w-full mt-2 p-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300 ${errors.role ? "border-red-500" : "border-gray-300"}`}
            >
              <option value="">Selecione o cargo</option>
              <option value="admin">Administrador</option>
              <option value="user">Usuário</option>
              <option value="manager">Gerente</option>
            </select>
            {/* {errors.role && (
              <p className="text-red-500 text-sm mt-1">{errors.role.message}</p>
            )} */}
          </div>

          {/* Botão de Cadastro */}
          <button
            type="submit"
            className="w-full py-3 px-4 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
          >
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
};

const Page = () => (
  <Suspense>
    <RegisterForm />
  </Suspense>
);

export default Page;
