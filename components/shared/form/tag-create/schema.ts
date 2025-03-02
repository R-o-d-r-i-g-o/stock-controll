import { z } from "zod";

const createTagSchema = z.object({
  tag: z.string().min(6, "O código é obrigatório"),
  metadata: z.string().refine((val) => {
    try {
      JSON.parse(val);
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  }, "Formato JSON inválido"),
});

type CreateShoeSchema = z.infer<typeof createTagSchema>;

export { createTagSchema, type CreateShoeSchema };
