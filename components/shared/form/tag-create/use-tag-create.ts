import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

import { useToast } from "@/lib/hooks/use-toast";
import { createTagAction } from "@/lib/features/tag/tag.actions";
import { createTagSchema, CreateShoeSchema } from "./schema";

type UseTagCreateFormProps = {
  shoeId: number;
};

const useTagCreateForm = ({ shoeId }: UseTagCreateFormProps) => {
  const router = useRouter();
  const defaultMetadata = JSON.stringify({ size: 36, price: 100.0 }, null, 2);

  const { success, failure } = useToast();

  const { register, handleSubmit, formState } = useForm<CreateShoeSchema>({
    resolver: zodResolver(createTagSchema),
    defaultValues: {
      metadata: defaultMetadata,
    },
  });

  const handleSubmitTagCreate = async (data: CreateShoeSchema) => {
    try {
      const result = await createTagAction(
        {
          sku: data.tag,
          metadata: JSON.parse(data.metadata),
        },
        shoeId
      );
      if (!result.success) {
        failure(result.error);
        return;
      }
      success("Nova etiqueta criada com sucesso!");
      router.back();
    } catch (err) {
      console.error(err);
      failure("Ocorreu um erro ao criar a etiqueta.");
    }
  };

  return {
    register,
    formState,
    handleSubmit,
    handleSubmitTagCreate,
  };
};

export default useTagCreateForm;
