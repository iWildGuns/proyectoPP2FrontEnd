import { z } from "zod";

export const ordenSchema = z.object({
  id: z.number(),
  fecha: z.string(),
  total: z.number()
})