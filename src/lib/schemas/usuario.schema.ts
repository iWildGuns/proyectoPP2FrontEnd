import { z } from "zod";

export const usuarioSchema = z.object({
  id: z.number(),
  nombre: z.string(),
  email: z.string()
})