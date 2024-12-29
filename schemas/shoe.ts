import * as Yup from "yup";

const createCategoryValdiationSchema = Yup.object({
  name: Yup.string().required("Nome é obrigatório"),
  sole: Yup.string().required("Sola é obrigatória"),
  color: Yup.string().required("Cor é obrigatória"),
  note: Yup.string().required("Nota é obrigatória"),
});

const updateCategoryValdiationSchema = createCategoryValdiationSchema
  .clone()
  .shape({
    id: Yup.number()
      .required("ID é obrigatório")
      .typeError("O ID precisa ser um número")
      .positive("O ID deve ser um número positivo")
      .integer("O ID deve ser um número inteiro"),
  });

export { createCategoryValdiationSchema, updateCategoryValdiationSchema };
