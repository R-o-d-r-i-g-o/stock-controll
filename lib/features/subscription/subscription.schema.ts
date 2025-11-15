import { z } from "zod";

const createSubscriptionSchema = z.object({
  price: z
    .number({
      required_error: "Preço é obrigatório",
      invalid_type_error: "O preço precisa ser um número",
    })
    .positive("O preço deve ser um número positivo"),
});

export { createSubscriptionSchema };

