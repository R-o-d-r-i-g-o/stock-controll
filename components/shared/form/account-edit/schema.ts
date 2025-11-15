import { z } from "zod";

const accountEditSchema = z.object({
  id: z.coerce.number().positive("ID é obrigatório"),
  name: z.string().min(1, "Nome da empresa é obrigatório"),
  code: z.string().optional(),
  subscriptionExpiresAt: z
    .string()
    .optional()
    .transform((val) => {
      if (!val || val === "") return null;
      return new Date(val);
    })
    .pipe(z.date().nullable().optional()),
});

type AccountEditSchema = z.infer<typeof accountEditSchema>;

export { accountEditSchema, type AccountEditSchema };
