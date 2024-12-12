
import { loginSchema } from '@/schemas'

import { signIn } from "next-auth/react";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { useToast } from '@/hooks/use-toast';
import { useSearchParams, useRouter } from "next/navigation";

const useLogin = () => {
    const router = useRouter()

    const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(loginSchema) });

    const { failure } = useToast();
    const searchParams = useSearchParams();

    const onSubmit = async (data: any) => {
        try {
            const auth = await signIn("credentials", { ...data, redirect: false });
            if (auth && !auth.ok) throw new Error()

            router.push(searchParams.get("callbackUrl") ?? "/test")
        } catch (err) {
            console.error(err)
            failure("Usuário ou senha incorretos.");
        }
    };

    return {
        register,
        handleSubmit,
        errors,
        onSubmit
    }
}

export { useLogin };