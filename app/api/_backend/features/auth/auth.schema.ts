import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email("Por favor, insira um email válido.").nonempty("O email é obrigatório."),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres.").nonempty("A senha é obrigatória."),
});

export { loginSchema };
