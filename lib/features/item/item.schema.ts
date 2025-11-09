import { z } from "zod";

enum OperationType {
  Register = "register",
  Debit = "debit",
}

const itemCreationSchema = z.object({
  sku: z.string().optional().default(""),
  size: z
    .number({ invalid_type_error: "O tamanho deve ser um número válido" })
    .int("O tamanho deve ser um número inteiro")
    .positive("O tamanho deve ser um número positivo"),
  price: z
    .number({ invalid_type_error: "Preço deve ser um número válido" })
    .positive("O preço deve ser um número positivo"),
  shoeId: z
    .number({ invalid_type_error: "O calçado deve ser um número válido" })
    .positive("O calçado deve ser um número positivo"),
});

const itemUpdateSchema = itemCreationSchema.extend({
  id: z
    .number({ invalid_type_error: "O ID deve ser um número válido" })
    .int("O ID deve ser um número inteiro")
    .positive("O ID deve ser um número positivo"),
});

const scanItemSchema = z.object({
  skus: z.array(z.string().min(1, "O SKU não pode ser vazio")).min(1, "Pelo menos um SKU é necessário"),
  oprationType: z.enum([OperationType.Register, OperationType.Debit], {
    errorMap: () => ({
      message: "O campo 'oprationType' deve ser 'register' ou 'debit'",
    }),
  }),
});

export { itemCreationSchema, itemUpdateSchema, scanItemSchema, OperationType };
