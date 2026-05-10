import { z } from 'zod';

export const platoSchema = z.object({
  id: z.string(),
  nombre: z.string(),
  descripcion: z.string(),
  categoria: z.string(),
  precio: z.number(),
  disponible: z.boolean(),
});

export type Plato = z.infer<typeof platoSchema>;