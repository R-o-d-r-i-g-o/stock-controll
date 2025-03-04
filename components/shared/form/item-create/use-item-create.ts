import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

import { useToast } from "@/lib/hooks";
import { createItem } from "@/lib/services";
import { footSizesList } from "@/common";
import { itemCreateSchema, ItemCreateSchema } from "./schema";

type useItemCreateFormProps = {
  shoeId: number;
};

const useItemCreateForm = ({ shoeId }: useItemCreateFormProps) => {
  const router = useRouter();
  const { success, failure } = useToast();

  const { register, handleSubmit, formState } = useForm<ItemCreateSchema>({
    resolver: zodResolver(itemCreateSchema),
    defaultValues: {
      sku: "",
      price: 0,
      size: 0,
    },
  });

  const handleSubmitTagEdit = async (data: ItemCreateSchema) => {
    try {
      await createItem({ ...data, shoeId });
      success("Novo item criado com sucesso!");
      router.push(`/panel/shoes/${shoeId}`);
    } catch (err) {
      console.error(err);
      failure("Erro ao criar o item. Tente novamente mais tarde.");
    }
  };

  const footSizeOptions = footSizesList.map((footsize) => ({
    lable: footsize,
    value: footsize,
  }));

  return {
    register,
    formState,
    handleSubmit,
    handleSubmitTagEdit,
    footSizeOptions,
  };
};

export default useItemCreateForm;
