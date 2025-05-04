import { useForm } from "react-hook-form";
import { useToast } from "@/lib/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";

import { accountEditSchema, AccountEditSchema } from "./schema";

type UseAccountEditFormProps = {
  data: {
    id: number;
    code: string;
    name: string;
    payment: boolean;
  };
};
const useAccountEditForm = ({ data }: UseAccountEditFormProps) => {
  const { success, failure } = useToast();

  const { register, handleSubmit, formState } = useForm<AccountEditSchema>({
    resolver: zodResolver(accountEditSchema),
    defaultValues: {
      name: data.name,
      code: data.code,
    },
  });

  const handleSubmitAccountEdit = async (formData: AccountEditSchema) => {
    try {
      console.log("formData", formData);

      success("Calçado atualizado com sucesso!");
    } catch (err) {
      console.error(err);
      failure("Erro ao atualizar o calçado. Tente novamente mais tarde.");
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
