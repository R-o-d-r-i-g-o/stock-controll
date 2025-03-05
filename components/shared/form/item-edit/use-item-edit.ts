import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

import { useToast } from "@/lib/hooks/use-toast";
import { updateItem } from "@/lib/services";
import { footSizesList } from "@/common";
import { itemEditSchema, ItemEditSchema } from "./schema";

type UseItemEditFromProps = {
  item: {
    id: number;
    sku: string;
    size: number;
    price: number;
    shoeId: number;
    createdAt: string;
    deletedAt: string | null;
  };
};

const useItemEditFrom = ({ item }: UseItemEditFromProps) => {
  const router = useRouter();
  const { success, failure } = useToast();

  const { register, handleSubmit, formState } = useForm<ItemEditSchema>({
    resolver: zodResolver(itemEditSchema),
    defaultValues: {
      sku: item.sku,
      size: item.size,
      price: item.price,
    },
  });

  const handleSubmitEditItem = async (data: ItemEditSchema) => {
    try {
      await updateItem({ ...data, shoeId: item.shoeId, id: item.id });
      success("Item atualizado com sucesso!");
      router.back();
    } catch (error) {
      console.error(error);
      failure("Erro ao atualizar o item.");
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
    handleSubmitEditItem,
    footSizeOptions,
  };
};

export default useItemEditFrom;
