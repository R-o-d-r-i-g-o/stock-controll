import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email("Por favor, insira um email válido.").nonempty("O email é obrigatório."),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres.").nonempty("A senha é obrigatória."),
});

const registerSchema = z.object({
  email: z.string().email("Digite um email válido").min(5, "O email deve ter pelo menos 5 caracteres"),

  username: z.string().min(3, "O nome de usuário deve ter pelo menos 3 caracteres").max(20, "O nome de usuário deve ter no máximo 20 caracteres"),

  password: z
    .string()
    .min(8, "A senha deve ter pelo menos 8 caracteres")
    .regex(/[A-Z]/, "A senha deve conter pelo menos uma letra maiúscula")
    .regex(/[a-z]/, "A senha deve conter pelo menos uma letra minúscula")
    .regex(/[0-9]/, "A senha deve conter pelo menos um número")
    .regex(/[@$!%*?&]/, "A senha deve conter pelo menos um caractere especial (@, $, !, %, *, ?, &)"),

  companyName: z
    .string()
    .min(2, "O nome da companhia deve ter pelo menos 2 caracteres")
    .max(100, "O nome da companhia deve ter no máximo 100 caracteres")
    .regex(/^[A-Za-zÀ-ÿ0-9\s\-.,&'()]+$/, "O nome da companhia contém caracteres inválidos")
    .nonempty("O nome da companhia não pode estar vazio"),
});

export { loginSchema, registerSchema };
