import { z } from "zod";

const registerSchema = z
  .object({
    email: z.string().email("Digite um email válido").min(5, "O email deve ter pelo menos 5 caracteres"),

    password: z
      .string()
      .min(8, "A senha deve ter pelo menos 8 caracteres")
      .regex(/[A-Z]/, "A senha deve conter pelo menos uma letra maiúscula")
      .regex(/[a-z]/, "A senha deve conter pelo menos uma letra minúscula")
      .regex(/[0-9]/, "A senha deve conter pelo menos um número")
      .regex(/[@$!%*?&]/, "A senha deve conter pelo menos um caractere especial (@, $, !, %, *, ?, &)"),

    confirmPassword: z.string(),

    companyName: z
      .string()
      .min(2, "O nome da companhia deve ter pelo menos 2 caracteres")
      .max(100, "O nome da companhia deve ter no máximo 100 caracteres")
      .regex(/^[A-Za-zÀ-ÿ0-9\s\-.,&'()]+$/, "O nome da companhia contém caracteres inválidos")
      .nonempty("O nome da companhia não pode estar vazio"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

type RegisterSchema = z.infer<typeof registerSchema>;

export { registerSchema, type RegisterSchema };
