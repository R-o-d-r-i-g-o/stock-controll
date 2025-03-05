import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import { useToast } from "@/lib/hooks/use-toast";
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
  roles: Array<{
    id: number;
    name: string;
  }>;
};

const useUserEditForm = ({ user, roles }: UseUserEditFormProps) => {
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

  const roleOptions = roles.map((role) => ({
    lable: role.name,
    value: role.id,
  }));

  return {
    register,
    formState,
    handleSubmit,
    handleSubmitEditUser,
    roleOptions,
  };
};

export default useUserEditForm;
