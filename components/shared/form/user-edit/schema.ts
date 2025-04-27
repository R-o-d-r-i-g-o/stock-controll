import { z } from "zod";

const editUserSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  email: z.string().email("Email inválido").min(1, "Email é obrigatório"),
  roleId: z.coerce.number().min(1, "Selecione um cargo"),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres").optional().or(z.literal("")),
});

type EditUserSchema = z.infer<typeof editUserSchema>;

export { editUserSchema, type EditUserSchema };
