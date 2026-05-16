import { z } from "zod";

export const salonSchema = z.object({
  id: z.number(),
  nombre: z.string(),
});