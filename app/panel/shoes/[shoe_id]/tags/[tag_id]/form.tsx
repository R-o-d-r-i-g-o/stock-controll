"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { z } from "zod";

import { useToast } from "@/lib/hooks";
// import { updateTag } from "@/lib/services";

import IdentIcon from "@mui/icons-material/FormatIndentIncrease";
import DeleteButton from "./delete";

// Validação do esquema para o formulário de edição
const editTagSchema = z.object({
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

type EditTagSchema = z.infer<typeof editTagSchema>;

type EditTagPageProps = {
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

const EditTagPage = ({ tag }: EditTagPageProps) => {
  const { success, failure } = useToast();
  const router = useRouter();

  const { register, handleSubmit, setValue, formState } =
    useForm<EditTagSchema>({
      resolver: zodResolver(editTagSchema),
      defaultValues: {
        tagSku: tag.sku,
        metadata: JSON.stringify(tag.metadata),
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

  const onSubmit = async (data: EditTagSchema) => {
    try {
      const parsedJson = JSON.parse(data.metadata);
      console.log("veio aqui", parsedJson, data);

      // await updateTag({ ...data, metadata: parsedJson });
      success("Tag editada com sucesso!");
      router.push("/panel/tags"); // Volta para a página de tags
    } catch (err) {
      console.error(err);
      failure("Erro ao editar a tag.");
    }
  };

  return (
    <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-md">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Editar etiqueta #{tag.id}
      </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-6">
          <label
            htmlFor="tagSku"
            className="block text-sm font-medium text-gray-600"
          >
            Código da Tag
          </label>
          <input
            id="tagSku"
            placeholder="Digite o código da tag"
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
            Metadata da Tag
          </label>
          <div className="relative">
            <textarea
              id="metadata"
              placeholder="Digite os meta-dados da tag"
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
          className="w-full py-3 px-4 mb-4 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
        >
          {formState.isSubmitting ? "Processando..." : "Salvar Alterações"}
        </button>
        <DeleteButton tagId={tag.id} />
      </form>
    </div>
  );
};

export default EditTagPage;
