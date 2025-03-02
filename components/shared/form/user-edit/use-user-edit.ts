import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import { useToast } from "@/lib/hooks";
import { updateUser } from "@/lib/services";
import { NavigationPage } from "@/common";
import { EditUserSchema, editUserSchema } from "./schema";

type UseUserEditFormProps = {
  user: {
    id: number;
    name: string;
    email: string;
    roleId: number;
    createdAt: string;
    deletedAt: string | null;
  };
};

const useUserEditForm = ({ user }: UseUserEditFormProps) => {
  const router = useRouter();
  const { success, failure } = useToast();

  const { register, handleSubmit, formState } = useForm<EditUserSchema>({
    resolver: zodResolver(editUserSchema),
    defaultValues: {
      name: user.name,
      email: user.email,
      roleId: user.roleId,
    },
  });

  const handleSubmitEditUser = async (data: EditUserSchema) => {
    try {
      await updateUser({ ...data, id: user.id });
      success("Usuário atualizado com sucesso!");
      router.push(NavigationPage.Users);
    } catch (err) {
      console.error(err);
      failure("Erro ao atualizar usuário. Tente novamente.");
    }
  };

  return {
    register,
    formState,
    handleSubmit,
    handleSubmitEditUser,
  };
};

export default useUserEditForm;
