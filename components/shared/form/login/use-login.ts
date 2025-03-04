import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useToast } from "@/lib/hooks";
import { loginSchema, LoginSchema } from "./schema";

import { useRouter } from "next/navigation";

type UseLoginFormProps = {
  callbackUrl?: string;
};

const useLoginForm = ({ callbackUrl }: UseLoginFormProps) => {
  const router = useRouter();
  const { failure } = useToast();

  const { register, handleSubmit, formState } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginSchema) => {
    try {
      const auth = await signIn("credentials", { ...data, redirect: false });
      if (!auth || !auth.ok) throw new Error();

      router.push(callbackUrl ?? "/panel");
    } catch (err) {
      console.error(err);
      failure("Usuário ou senha incorretos.");
    }
  };

  return {
    register,
    formState,
    handleSubmit,
    onSubmit,
  };
};

export default useLoginForm;
