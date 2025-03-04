import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

import { useToast } from "@/lib/hooks";
import { updateTag } from "@/lib/services";

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

  const { register, handleSubmit, setValue, formState } =
    useForm<TagEditSchema>({
      resolver: zodResolver(tagEditSchema),
      defaultValues: {
        sku: tag.sku,
        metadata: JSON.stringify(tag.metadata, null, 2),
      },
    });

  const handleIndentJson = () => {
    const jsonInput = document.getElementById(
      "metadata"
    ) as HTMLTextAreaElement;
    try {
      setValue(
        "metadata",
        JSON.stringify(JSON.parse(jsonInput.value), null, 2)
      );
    } catch (err) {
      failure("Erro ao formatar JSON");
      console.error(err);
    }
  };

  const handleSubmitTagEdit = async (data: TagEditSchema) => {
    try {
      await updateTag({
        ...tag,
        sku: data.sku,
        metadata: JSON.parse(data.metadata),
      });
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
    handleIndentJson,
  };
};

export default useTagEditForm;
