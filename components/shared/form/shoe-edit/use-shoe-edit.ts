import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

import { updateShoe } from "@/lib/services";
import { useToast } from "@/lib/hooks/use-toast";

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
  const router = useRouter();

  const { register, handleSubmit, formState } = useForm<ShoeEditSchema>({
    resolver: zodResolver(shoeEditSchema),
    defaultValues: {
      name: data.name,
      sole: data.sole,
      color: data.color,
      note: data.note,
    },
  });

  const handleSubmitUserEdit = async (formData: ShoeEditSchema) => {
    try {
      await updateShoe({ ...formData, id: data.id });
      success("Calçado atualizado com sucesso!");
      router.push("/panel/shoes");
    } catch (err) {
      console.error(err);
      failure("Erro ao atualizar o calçado. Tente novamente mais tarde.");
    }
  };

  return {
    register,
    formState,
    handleSubmit,
    handleSubmitUserEdit,
  };
};

export default useShoeEditForm;
