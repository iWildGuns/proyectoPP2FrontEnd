import { z } from "zod";

export const mesaSchema = z.object({
  id: z.number(),
  numero: z.number(),
  capacidad: z.number(),
  mesero: z.string(),
  duracionestimada: z.number(),
  tiempo: z.number(),
  ocupacion: z.number()

})