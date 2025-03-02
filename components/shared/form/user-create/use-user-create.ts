import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

import { useToast } from "@/lib/hooks";
import { createUser } from "@/lib/services";
import { createUserSchema, CreateUserSchema } from "./schema";

const useUserCreateForm = () => {
  const router = useRouter();
  const { success, failure } = useToast();

  const { register, handleSubmit, formState } = useForm<CreateUserSchema>({
    resolver: zodResolver(createUserSchema),
  });

  const handleCrateUser = async (data: CreateUserSchema) => {
    try {
      await createUser(data);
      success("Usuário criado com sucesso!");
      router.push("/panel/users");
    } catch (err) {
      console.error(err);
      failure("Houve um erro ao criar o usuário, tente novamente mais tarde!");
    }
  };

  return {
    register,
    formState,
    handleSubmit,
    handleCrateUser,
  };
};

export default useUserCreateForm;
