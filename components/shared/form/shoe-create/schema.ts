import { z } from "zod";

const createShoeSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  sole: z.string().min(1, "Sola é obrigatória"),
  color: z.string().min(1, "Cor é obrigatória"),
  note: z
    .string()
    .optional()
    .default(() => ""),
});

type CreateShoeSchema = z.infer<typeof createShoeSchema>;

export { createShoeSchema, type CreateShoeSchema };
