import { z } from "zod";

const getUsersPaginatedSchema = z.object({
  page: z.coerce.number().default(1),
  size: z.coerce.number().default(10),
});

export { getUsersPaginatedSchema };
