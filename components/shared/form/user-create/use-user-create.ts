import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

import { useToast } from "@/lib/hooks/use-toast";
import { createUserAction } from "@/lib/features/user/user.actions";
import { createUserSchema, CreateUserSchema } from "./schema";

type UseUserCreateFormProps = {
  roles: {
    id: number;
    name: string;
  }[];
};

const useUserCreateForm = ({ roles }: UseUserCreateFormProps) => {
  const router = useRouter();
  const { success, failure } = useToast();

  const { register, handleSubmit, formState } = useForm<CreateUserSchema>({
    resolver: zodResolver(createUserSchema),
  });

  const handleCrateUser = async (data: CreateUserSchema) => {
    try {
      const result = await createUserAction(data);
      if (!result.success) {
        failure(result.error);
        return;
      }
      success("Usuário criado com sucesso!");
      router.push("/panel/users");
    } catch (err) {
      console.error(err);
      failure("Houve um erro ao criar o usuário, tente novamente mais tarde!");
    }
  };

  const roleOptions = roles.map((role) => ({
    lable: role.name,
    value: role.id,
  }));

  return {
    register,
    formState,
    handleSubmit,
    handleCrateUser,
    roleOptions,
  };
};

export default useUserCreateForm;
