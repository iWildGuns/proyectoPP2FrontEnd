import { z } from "zod";

export const platoSchema = z.object({
  id: z.number(),
  nombre: z.string(),
  precio: z.number()
})