import { z } from "zod";

const itemCreateSchema = z.object({
  sku: z.string().min(1, { message: "SKU é obrigatório" }),
  size: z.coerce.number().min(1, { message: "Tamanho é obrigatório" }),
  price: z.coerce
    .number()
    .min(0.01, { message: "Preço deve ser maior que zero" }),
});

type ItemCreateSchema = z.infer<typeof itemCreateSchema>;

export { itemCreateSchema, type ItemCreateSchema };
