import * as Yup from "yup";
import { z } from "zod";

const itemCreationSchema = Yup.object().shape({
  sku: Yup.string().optional().default(""),

  size: Yup.number().integer("O tamanho deve ser um número inteiro").positive("O tamanho deve ser um número positivo").required("Tamanho é obrigatório"),

  price: Yup.number().positive("O preço deve ser um número positivo").required("Preço é obrigatório").typeError("Preço deve ser um número válido"),

  shoeId: Yup.number().positive("O calçado deve ser um número positivo").required("O calçado é obrigatório").typeError("O calçado deve ser um número válido"),
});

const itemUpdateSchema = itemCreationSchema.clone().shape({
  id: Yup.number().integer("O ID deve ser um número inteiro").positive("O ID deve ser um número positivo").required("O ID do item deve ser referenciado"),
});

enum OperationType {
  Register = "register",
  Debit = "debit",
}

const formSchema = z.object({
  skus: z.array(z.string().min(1, "O SKU não pode ser vazio")),
  oprationType: z.enum([OperationType.Register, OperationType.Debit], {
    errorMap: () => ({
      message: "O campo 'oprationType' deve ser 'register' ou 'debit'",
    }),
  }),
});

export { itemCreationSchema, itemUpdateSchema, formSchema, OperationType };
