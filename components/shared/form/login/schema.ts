import { z } from "zod";

const loginSchema = z.object({
  email: z
    .string()
    .email("Digite um email válido")
    .min(5, "O email deve ter pelo menos 5 caracteres"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
  // .regex(/[A-Z]/, "A senha deve ter pelo menos uma letra maiúscula")
  // .regex(/[0-9]/, "A senha deve ter pelo menos um número")
  // .regex(
  //   /[@$!%*?&]/,
  //   "A senha deve ter pelo menos um caractere especial (@, $, !, %, *, ?, &)"
  // ),
});

type LoginSchema = z.infer<typeof loginSchema>;

export { loginSchema, type LoginSchema };
