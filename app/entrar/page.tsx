'use client'

import { loginSchema } from '@/schemas'

import { signIn } from "next-auth/react";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

export default function Home() {
    const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(loginSchema) });

    const onSubmit = async (data: any) => {
        try {
            await signIn("credentials", { ...data, callbackUrl: '/test' });
        } catch (err) {
            console.error(err)
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500">
            <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Login</h2>

                {/* Exibindo erro geral */}
                {errors.email || errors.password ? (
                    <p className="text-red-500 text-center mb-4">Por favor, corrija os erros abaixo.</p>
                ) : null}

                <form onSubmit={handleSubmit(onSubmit)}>
                    {/* Campo de Email */}
                    <div className="mb-6">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-600">Email</label>
                        <input
                            type="email"
                            id="email"
                            {...register("email")}
                            placeholder="Digite seu email"
                            className={`w-full mt-2 p-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300 ${errors.email ? "border-red-500" : "border-gray-300"
                                }`}
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                        )}
                    </div>

                    {/* Campo de Senha */}
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-600">Senha</label>
                        <input
                            type="password"
                            id="password"
                            {...register("password")}
                            placeholder="Digite sua senha"
                            className={`w-full mt-2 p-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300 ${errors.password ? "border-red-500" : "border-gray-300"
                                }`}
                        />
                        {errors.password && (
                            <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3 px-4 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
                    >
                        Entrar
                    </button>
                </form>
            </div>
        </div>
    );
}
