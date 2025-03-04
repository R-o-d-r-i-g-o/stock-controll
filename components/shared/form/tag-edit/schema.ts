import { z } from "zod";

const tagEditSchema = z.object({
  sku: z.string().min(6, "O código é obrigatório"),
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

type TagEditSchema = z.infer<typeof tagEditSchema>;

export { tagEditSchema, type TagEditSchema };
