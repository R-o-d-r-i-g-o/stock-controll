import { z } from "zod";

const createUserSchema = z.object({
  name: z.string().min(1, "O nome é obrigatório"),
  roleId: z.coerce.number().min(1, "Selecione um cargo"),
  email: z.string().email("Digite um email válido").min(1, "O email é obrigatório"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres").min(1, "A senha é obrigatória"),
});

type CreateUserSchema = z.infer<typeof createUserSchema>;

export { createUserSchema, type CreateUserSchema };
