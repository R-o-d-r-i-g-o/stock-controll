import { z } from "zod";

const createTagSchema = z.object({
  sku: z.string().min(6, "O código é obrigatório"),
  metadata: z.object({}).required(),
});

export { createTagSchema };
