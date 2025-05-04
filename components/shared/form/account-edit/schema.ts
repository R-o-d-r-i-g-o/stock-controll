import { z } from "zod";

const accountEditSchema = z.object({
  name: z.string().min(1, "Nome da empresa é obrigatório"),
  code: z.string().min(1, "Código da empresa é obrigatório"),
});

type AccountEditSchema = z.infer<typeof accountEditSchema>;

export { accountEditSchema, type AccountEditSchema };
