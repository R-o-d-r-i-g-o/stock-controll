import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

import { useToast } from "@/lib/hooks/use-toast";
import { createShoe } from "@/lib/services";
import { createShoeSchema, CreateShoeSchema } from "./schema";

const useShoeCreateForm = () => {
  const router = useRouter();
  const { success, failure } = useToast();

  const { register, handleSubmit, formState } = useForm<CreateShoeSchema>({
    resolver: zodResolver(createShoeSchema),
  });

  const handleSubmitCreateShoe = async (data: CreateShoeSchema) => {
    try {
      await createShoe(data);
      success("Novo calçado criado com sucesso!");
      router.push("/panel/shoes");
    } catch (err) {
      console.error(err);
      failure("Ocorreu um erro ao criar o calçado.");
    }
  };

  return {
    register,
    formState,
    handleSubmit,
    handleSubmitCreateShoe,
  };
};

export default useShoeCreateForm;
