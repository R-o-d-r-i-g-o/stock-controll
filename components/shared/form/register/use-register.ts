import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useToast } from "@/lib/hooks/use-toast";
import { registerSchema, RegisterSchema } from "./schema";

import { useRouter } from "next/navigation";

const useRegisterForm = () => {
  const router = useRouter();
  const { failure } = useToast();

  const { register, handleSubmit, formState } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterSchema) => {
    try {
      console.log("veio aqui ", data);

      router.push("/login");
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

export default useRegisterForm;
