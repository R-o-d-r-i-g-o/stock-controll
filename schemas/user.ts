import * as Yup from "yup";

const loginSchema = Yup.object({
  email: Yup.string()
    .email("Por favor, insira um email válido.")
    .required("O email é obrigatório."),
  password: Yup.string()
    .min(6, "A senha deve ter pelo menos 6 caracteres.")
    .required("A senha é obrigatória."),
});

const createUserSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "O nome deve ter pelo menos 3 caracteres.")
    .max(100, "O nome pode ter no máximo 100 caracteres.")
    .required("O nome é obrigatório."),

  email: Yup.string()
    .email("O email deve ser válido.")
    .required("O email é obrigatório."),

  roleId: Yup.number()
    .integer("O cargo do usuário deve ser um número inteiro.")
    .positive("O cargo do usuário deve ser um número positivo.")
    .nonNullable("O cargo do usuário não pode estar vazio.")
    .required("O cargo do usuário é obrigatório."),

  password: Yup.string()
    .min(6, "A senha deve ter pelo menos 6 caracteres.")
    .max(50, "A senha pode ter no máximo 50 caracteres.")
    .required("A senha é obrigatória."),
});

const updateUserSchema = createUserSchema.clone().shape({
  id: Yup.number()
    .integer("O ID deve ser um número inteiro.")
    .positive("O ID deve ser um número positivo.")
    .required("O ID do usuário é obrigatório."),

  password: Yup.string()
    .nullable()
    .transform((value) => (value === "" ? null : value))
    .min(6, "A senha deve ter pelo menos 6 caracteres.")
    .max(50, "A senha pode ter no máximo 50 caracteres."),
});

export { loginSchema, createUserSchema, updateUserSchema };
