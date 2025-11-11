import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import { useToast } from "@/lib/hooks/use-toast";
import { registerSchema, RegisterSchema } from "./schema";
import { registerAction } from "@/lib/features/auth/auth.actions";

const useRegisterForm = () => {
  const router = useRouter();
  const { success, failure } = useToast();

  const { register, handleSubmit, formState } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterSchema) => {
    try {
      const result = await registerAction(data);
      if (!result.success) {
        failure(result.error || "Erro ao realizar registro. Tente novamente.");
        return;
      }

      success("Registro realizado com sucesso! Você pode fazer login agora.");
      router.push("/login");
    } catch (err) {
      console.error(err);
      failure("Erro ao realizar registro. Tente novamente mais tarde.");
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
