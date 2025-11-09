import { z } from "zod";

const createTagSchema = z.object({
  sku: z.string().min(6, "O código é obrigatório"),
  metadata: z.object({}).catchall(z.any()),
});

const deleteTagSchema = z.object({
  shoeId: z.coerce.number().int(),
  tagId: z.coerce.number().int(),
});

const updateTagSchema = createTagSchema;

export { deleteTagSchema, createTagSchema, updateTagSchema };
