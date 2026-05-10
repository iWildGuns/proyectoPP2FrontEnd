import { z } from 'zod';

export const mesaSchema = z.object({
  id: z.string(),
  numero: z.number(),
  capacidad: z.number(),
  salonId: z.string(),
  estado: z.string(),
});

export type Mesa = z.infer<typeof mesaSchema>;