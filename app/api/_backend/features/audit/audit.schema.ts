import { z } from "zod";

const getUsersPaginatedSchema = z.object({
  page: z.number().default(1),
  size: z.number().default(10),
});

export { getUsersPaginatedSchema };
