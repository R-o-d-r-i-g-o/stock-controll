import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

import { useToast } from "@/lib/hooks/use-toast";
import { updateTagAction } from "@/lib/features/tag/tag.actions";

import { tagEditSchema, TagEditSchema } from "./schema";

type UseTagEditFormProps = {
  tag: {
    id: number;
    sku: string;
    shoeId: number;
    userId: number;
    metadata: { [key: string]: object };
    createdAt: Date;
    deletedAt: Date | null;
  };
};

const useTagEditForm = ({ tag }: UseTagEditFormProps) => {
  const { success, failure } = useToast();
  const router = useRouter();

  const { register, handleSubmit, formState } = useForm<TagEditSchema>({
    resolver: zodResolver(tagEditSchema),
    defaultValues: {
      sku: tag.sku,
      metadata: JSON.stringify(tag.metadata, null, 2),
    },
  });

  const handleSubmitTagEdit = async (data: TagEditSchema) => {
    try {
      const result = await updateTagAction(
        {
          sku: data.sku,
          metadata: JSON.parse(data.metadata),
        },
        tag.id,
        tag.shoeId
      );
      if (!result.success) {
        failure(result.error);
        return;
      }
      success("Tag editada com sucesso!");
      router.push(`/panel/shoes/${tag.shoeId}/tags`);
    } catch (err) {
      console.error(err);
      failure("Erro ao editar a tag.");
    }
  };

  return {
    register,
    formState,
    handleSubmit,
    handleSubmitTagEdit,
  };
};

export default useTagEditForm;
