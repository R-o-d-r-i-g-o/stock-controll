import { useForm } from "react-hook-form";
import { useToast } from "@/lib/hooks/use-toast";
import { updateShoeAction } from "@/lib/features/shoe/shoe.actions";
import { zodResolver } from "@hookform/resolvers/zod";

import { ShoeEditSchema, shoeEditSchema } from "./schema";

type UseShoeEditFormProps = {
  data: {
    id: number;
    name: string;
    sole: string;
    color: string;
    note: string;
    createdAt: string;
    deletedAt: string | null;
  };
};

const useShoeEditForm = ({ data }: UseShoeEditFormProps) => {
  const { success, failure } = useToast();

  const { register, handleSubmit, formState } = useForm<ShoeEditSchema>({
    resolver: zodResolver(shoeEditSchema),
    defaultValues: {
      name: data.name,
      sole: data.sole,
      color: data.color,
      note: data.note,
    },
  });

  const handleSubmitShoeEdit = async (formData: ShoeEditSchema) => {
    try {
      const result = await updateShoeAction({ ...formData, id: data.id });
      if (!result.success) {
        failure(result.error);
        return;
      }
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
    handleSubmitShoeEdit,
  };
};

export default useShoeEditForm;
