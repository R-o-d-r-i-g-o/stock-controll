import { z } from "zod";

const createShoeSchema = z.object({
  name: z.string().nonempty("Nome é obrigatório"),
  sole: z.string().nonempty("Sola é obrigatória"),
  color: z.string().nonempty("Cor é obrigatória"),
  note: z.string().optional().or(z.literal("")).default(""),
});

const updateShoeSchema = createShoeSchema.extend({
  id: z
    .number({
      required_error: "ID é obrigatório",
      invalid_type_error: "O ID precisa ser um número",
    })
    .positive("O ID deve ser um número positivo")
    .int("O ID deve ser um número inteiro"),
});

export { createShoeSchema, updateShoeSchema };
