import { z } from "zod";

const itemEditSchema = z.object({
  sku: z.string().min(1, "SKU é obrigatório"),
  size: z.coerce.number().min(1, "Tamanho é obrigatório"),
  price: z.coerce.number().positive("Preço deve ser maior que zero"),
});

type ItemEditSchema = z.infer<typeof itemEditSchema>;

export { itemEditSchema, type ItemEditSchema };
