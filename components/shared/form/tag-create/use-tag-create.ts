import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import { useToast } from "@/lib/hooks";
import * as svc from "@/lib/services";
import { createTagSchema, CreateShoeSchema } from "./schema";

const useTagCreateForm = () => {
  const router = useRouter();
  const defaultMetadata = JSON.stringify({ size: 36, price: 100.0 }, null, 2);

  const { success, failure } = useToast();

  const { register, handleSubmit, setValue, formState } =
    useForm<CreateShoeSchema>({
      resolver: zodResolver(createTagSchema),
      defaultValues: {
        metadata: defaultMetadata,
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

  const handleSubmitTagCreate = async (data: CreateShoeSchema) => {
    try {
      await svc.createShoeRelatedTag({
        shoeId: 1,
        payload: {
          sku: data.tag,
          metadata: JSON.parse(data.metadata),
        },
      });
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
    handleIndentJson,
  };
};

export default useTagCreateForm;
