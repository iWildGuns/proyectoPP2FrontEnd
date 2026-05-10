import { z } from 'zod';

export const ordenSchema = z.object({
  id: z.number(),
  mesa: z.number(),
  producto: z.string(),
  cantidad: z.number(),
  estado: z.string(),
});

export type Orden = z.infer<typeof ordenSchema>;