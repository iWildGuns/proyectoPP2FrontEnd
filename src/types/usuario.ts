import { z } from 'zod';

export const usuarioSchema = z.object({
  id: z.string(),
  nombre: z.string(),
  apellido: z.string(),
  email: z.string().email(),
  telefono: z.string().optional(),
  rol: z.string(),
  activo: z.boolean(),
});

export type Usuario = z.infer<typeof usuarioSchema>;