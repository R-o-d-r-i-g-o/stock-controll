import { z } from "zod";

const loginSchema = z.object({
  email: z
    .string()
    .email("Por favor, insira um email válido.")
    .nonempty("O email é obrigatório."),
  password: z
    .string()
    .min(6, "A senha deve ter pelo menos 6 caracteres.")
    .nonempty("A senha é obrigatória."),
});

const createUserSchema = z.object({
  name: z
    .string()
    .min(3, "O nome deve ter pelo menos 3 caracteres.")
    .max(100, "O nome pode ter no máximo 100 caracteres.")
    .nonempty("O nome é obrigatório."),
  email: z
    .string()
    .email("O email deve ser válido.")
    .nonempty("O email é obrigatório."),
  roleId: z
    .number({
      required_error: "O cargo do usuário é obrigatório.",
      invalid_type_error: "O cargo do usuário deve ser um número.",
    })
    .int("O cargo do usuário deve ser um número inteiro.")
    .positive("O cargo do usuário deve ser um número positivo."),
  password: z
    .string()
    .min(6, "A senha deve ter pelo menos 6 caracteres.")
    .max(50, "A senha pode ter no máximo 50 caracteres.")
    .nonempty("A senha é obrigatória."),
});

const updateUserSchema = createUserSchema.extend({
  id: z
    .number({
      required_error: "O ID do usuário é obrigatório.",
      invalid_type_error: "O ID deve ser um número.",
    })
    .int("O ID deve ser um número inteiro.")
    .positive("O ID deve ser um número positivo."),
  password: z
    .string()
    .min(6, "A senha deve ter pelo menos 6 caracteres.")
    .max(50, "A senha pode ter no máximo 50 caracteres.")
    .optional()
    .default("")
    .or(z.literal("")),
});

export { loginSchema, createUserSchema, updateUserSchema };
