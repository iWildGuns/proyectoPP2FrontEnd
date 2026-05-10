import { z } from 'zod';

export const salonSchema = z.object({
  id: z.string(),
  nombre: z.string(),
  descripcion: z.string().optional(),
  capacidad: z.number(),
  habilitado: z.boolean(),
});

export type Salon = z.infer<typeof salonSchema>;