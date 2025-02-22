import * as Yup from "yup";

const itemCreationSchema = Yup.object().shape({
  sku: Yup.string().optional().default(""),

  size: Yup.number()
    .integer("O tamanho deve ser um número inteiro")
    .positive("O tamanho deve ser um número positivo")
    .required("Tamanho é obrigatório"),

  price: Yup.number()
    .positive("O preço deve ser um número positivo")
    .required("Preço é obrigatório")
    .typeError("Preço deve ser um número válido"),

  shoeId: Yup.number()
    .positive("O calçado deve ser um número positivo")
    .required("O calçado é obrigatório")
    .typeError("O calçado deve ser um número válido"),
});

const itemUpdateSchema = itemCreationSchema.clone().shape({
  id: Yup.number()
    .integer("O ID deve ser um número inteiro")
    .positive("O ID deve ser um número positivo")
    .required("O ID do item deve ser referenciado"),
});

export { itemCreationSchema, itemUpdateSchema };
