"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { z } from "zod";

import { useToast } from "@/lib/hooks";
import { footSizesList } from "@/common";
import { updateItem, deleteShoeById } from "@/lib/services";

const itemUpdateSchema = z.object({
  sku: z.string().min(1, "SKU é obrigatório"),
  size: z.coerce.number().min(1, "Tamanho é obrigatório"),
  price: z.coerce.number().positive("Preço deve ser maior que zero"),
});

type ItemUpdateFormData = z.infer<typeof itemUpdateSchema>;

type ItemUpdateFormProps = {
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

const ItemUpdateFormProps = ({ item }: ItemUpdateFormProps) => {
  const { success, failure } = useToast();
  const router = useRouter();

  const { register, handleSubmit, formState } = useForm<ItemUpdateFormData>({
    resolver: zodResolver(itemUpdateSchema),
    defaultValues: {
      sku: item.sku,
      price: item.price,
      size: item.size,
    },
  });

  const onSubmit = async (data: ItemUpdateFormData) => {
    try {
      await updateItem({ ...data, shoeId: item.shoeId, id: item.id });
      success("Item atualizado com sucesso!");
      router.back();
    } catch (error) {
      console.error(error);
      failure("Erro ao atualizar o item.");
    }
  };

  const handleDelete = () => {
    Swal.fire({
      title: "Tem certeza?",
      text: "Essa ação não pode ser desfeita!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sim, deletar!",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      try {
        if (!result.isConfirmed) return;

        await deleteShoeById(item.shoeId);
        success("O item foi deletado com sucesso!");
        router.push(`/panel/shoes/${item.shoeId}`);
      } catch (err) {
        console.error(err);
        failure("Houve um erro ao deletar o item.");
      }
    });
  };

  return (
    <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-md">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
        {`Editar item #${item.id}`}
      </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-6">
          <label
            htmlFor="sku"
            className="block text-sm font-medium text-gray-600"
          >
            SKU
          </label>
          <input
            id="sku"
            placeholder="Defina um código para o item"
            className="w-full mt-2 p-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700 transition duration-300"
            {...register("sku")}
          />
          {formState.errors.sku && (
            <p className="text-red-600 text-sm">
              {formState.errors.sku.message}
            </p>
          )}
        </div>
        <div className="mb-6">
          <label
            htmlFor="price"
            className="block text-sm font-medium text-gray-600"
          >
            Preço
          </label>
          <input
            id="price"
            type="number"
            placeholder="Digite o preço do item"
            className="w-full mt-2 p-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700 transition duration-300"
            {...register("price")}
          />
          {formState.errors.price && (
            <p className="text-red-600 text-sm">
              {formState.errors.price.message}
            </p>
          )}
        </div>
        <div className="mb-6">
          <label
            htmlFor="size"
            className="block text-sm font-medium text-gray-600"
          >
            Tamanho
          </label>
          <select
            id="size"
            className="w-full mt-2 p-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700 transition duration-300"
            {...register("size")}
          >
            {footSizesList?.map((footSize) => (
              <option key={footSize} value={footSize}>
                {footSize}
              </option>
            ))}
          </select>
          {formState.errors.size && (
            <p className="text-red-600 text-sm">
              {formState.errors.size.message}
            </p>
          )}
        </div>
        <button
          type="submit"
          disabled={formState.isSubmitting}
          className="w-full py-3 px-4 mb-4 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
        >
          {formState.isSubmitting ? "Processando..." : "Cadastrar"}
        </button>
        <button
          type="button"
          onClick={handleDelete}
          className="w-full py-3 px-4 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-300"
        >
          Deletar item
        </button>
      </form>
    </div>
  );
};

export default ItemUpdateFormProps;
