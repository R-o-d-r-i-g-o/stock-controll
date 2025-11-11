import { z } from "zod";

const updateCompanySchema = z.object({
  id: z
    .number({
      required_error: "ID é obrigatório",
      invalid_type_error: "O ID precisa ser um número",
    })
    .positive("O ID deve ser um número positivo")
    .int("O ID deve ser um número inteiro"),
  name: z.string().min(1, "Nome da empresa é obrigatório").optional(),
  subscriptionExpiresAt: z.coerce.date().nullable().optional(),
});

export { updateCompanySchema };

