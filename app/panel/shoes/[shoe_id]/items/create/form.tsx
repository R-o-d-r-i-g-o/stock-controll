"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { z } from "zod";

import { useToast } from "@/hooks";
import { footSizesList } from "@/common";
import { createItem } from "@/services";

const itemCreationSchema = z.object({
  sku: z.string().min(1, { message: "SKU é obrigatório" }),
  size: z.coerce.number().min(1, { message: "Tamanho é obrigatório" }),
  price: z.coerce
    .number()
    .min(0.01, { message: "Preço deve ser maior que zero" }),
});

type ItemCreationFormData = z.infer<typeof itemCreationSchema>;

type ItemCreateformProps = {
  shoeId: number;
};

const ItemCreateForm = ({ shoeId }: ItemCreateformProps) => {
  const { success, failure } = useToast();
  const router = useRouter();

  const { register, handleSubmit, formState } = useForm<ItemCreationFormData>({
    resolver: zodResolver(itemCreationSchema),
    defaultValues: {
      sku: "",
      price: 0,
      size: 0,
    },
  });

  const onSubmit = async (data: ItemCreationFormData) => {
    try {
      await createItem({ ...data, shoeId });
      success("Novo item criado com sucesso!");
      router.push(`/panel/shoes/${shoeId}`);
    } catch (err) {
      console.error(err);
      failure("Erro ao criar o item. Tente novamente mais tarde.");
    }
  };

  return (
    <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-md">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Novo item
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
            placeholder="Definal um código para o item"
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
            step={0.01}
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
          className="w-full py-3 px-4 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
        >
          {formState.isSubmitting ? "Processando..." : "Cadastrar"}
        </button>
      </form>
    </div>
  );
};

export default ItemCreateForm;
