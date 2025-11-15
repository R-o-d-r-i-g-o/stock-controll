import { useForm } from "react-hook-form";
import { useToast } from "@/lib/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";

import { accountEditSchema, AccountEditSchema } from "./schema";
import { updateCompanyAction } from "@/lib/features/company/company.actions";

type UseAccountEditFormProps = {
  data: {
    id: number;
    code: string;
    name: string;
    subscriptionExpiresAt?: Date | null;
  };
};
const useAccountEditForm = ({ data }: UseAccountEditFormProps) => {
  const { success, failure } = useToast();

  const { register, handleSubmit, formState } = useForm<AccountEditSchema>({
    resolver: zodResolver(accountEditSchema),
    defaultValues: {
      id: data.id,
      name: data.name,
      code: data.code,
      subscriptionExpiresAt: data.subscriptionExpiresAt ? new Date(data.subscriptionExpiresAt) : null,
    },
  });

  const handleSubmitAccountEdit = async (formData: AccountEditSchema) => {
    try {
      const result = await updateCompanyAction(formData);
      if (!result.success) {
        failure(result.error);
        return;
      }
      success("Empresa atualizada com sucesso!");
    } catch (err) {
      console.error(err);
      failure("Erro ao atualizar a empresa. Tente novamente mais tarde.");
    }
  };

  return {
    register,
    formState,
    handleSubmit,
    handleSubmitAccountEdit,
  };
};

export default useAccountEditForm;
