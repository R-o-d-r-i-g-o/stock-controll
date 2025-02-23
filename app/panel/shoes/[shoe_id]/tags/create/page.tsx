"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { z } from "zod";

import { useToast } from "@/lib/hooks";
import * as svc from "@/lib/services";

import IdentIcon from "@mui/icons-material/FormatIndentIncrease";

const createTagSchema = z.object({
  tagSku: z.string().min(6, "O código é obrigatório"),
  metadata: z.string().refine((val) => {
    try {
      JSON.parse(val);
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  }, "Formato JSON inválido"),
});

type CreateShoeSchema = z.infer<typeof createTagSchema>;

const TagCreatePage = () => {
  const router = useRouter();
  const { success, failure } = useToast();

  const defaultMetadata = JSON.stringify(
    {
      size: 36,
      price: 100.0,
    },
    null,
    2
  );

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

  const onSubmit = async (data: CreateShoeSchema) => {
    try {
      await svc.createShoeRelatedTag({
        shoeId: 1,
        payload: {
          sku: data.tagSku,
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

  return (
    <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-md">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Nova etiqueta
      </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-6">
          <label
            htmlFor="tagSku"
            className="block text-sm font-medium text-gray-600"
          >
            Código da etiqueta
          </label>
          <input
            id="tagSku"
            placeholder="Digite aqui o código da etiqueta"
            className="w-full mt-2 p-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700 transition duration-300"
            {...register("tagSku")}
          />
          {formState.errors.tagSku && (
            <p className="text-red-500 text-sm mt-1">
              {formState.errors.tagSku.message}
            </p>
          )}
        </div>
        <div className="mb-6">
          <label
            htmlFor="metadata"
            className="block mb-2 text-sm font-medium text-gray-600"
          >
            Metadata do produto
          </label>
          <div className="relative">
            <textarea
              id="metadata"
              placeholder="Digite aqui os meta-dados"
              className="w-full overflow-y-hidden p-3 pr-10 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700 transition duration-300"
              rows={6}
              {...register("metadata")}
            />
            <button
              type="button"
              onClick={handleIndentJson}
              className="absolute top-2 p-1 right-2 bg-gray-200 text-gray-600 rounded-lg hover:bg-gray-300 focus:outline-none"
            >
              <IdentIcon fontSize="small" />
            </button>
          </div>
          {formState.errors.metadata && (
            <p className="text-red-500 text-sm mt-1">
              {formState.errors.metadata.message}
            </p>
          )}
        </div>
        <button
          type="submit"
          disabled={formState.isSubmitting}
          className="w-full py-3 px-4 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
        >
          {formState.isSubmitting ? "Processando..." : "Cadastrar"}
        </button>
      </form>
    </div>
  );
};

export default TagCreatePage;
