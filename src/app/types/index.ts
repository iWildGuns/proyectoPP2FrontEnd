import { z } from 'zod';

/** Plato schema */

export const platoSchema = z.object({
  id: z.string().optional(),
  codigo: z.string().min(1, "El codigo es obligatorio."),
  nombre: z.string().min(3,"El nombre debe tener al menos 3 caracteres."),
  descripcion: z.string().optional(),
  precio: z.coerce.number()
  .positive({ message: "El precio debe ser mayor a 0." })
  .multipleOf(0.01, { message: "El precio debe tener un maximo de 2 decimales." }),
  sinGluten: z.boolean(),
  disponible: z.boolean()
});

export type Plato = z.infer<typeof platoSchema>;

/** Pedido schema */

export const pedidoStatusSchema = z.enum(['Pendiente', 'Entregado', 'Cancelado']);

export const pedidoSchema = z.object({
  id: z.string(),
  mesaId: z.string(),
  platoId: z.string().nullable(),
  plato: platoSchema.nullable(),
  estado: pedidoStatusSchema,
  createdAt: z.string(),
});

export type Pedido = z.infer<typeof pedidoSchema>;

/** Mesa schema */

export const mesaStatusSchema = z.enum(['Disponible', 'Ocupada', 'Reservada', 'Mantenimiento']);

export type mesaStatus = z.infer<typeof mesaStatusSchema>;

export const mesaSchema = z.object({
  id: z.string(),
  numero: z.int(),
  capacidad: z.string(),
  estado: mesaStatusSchema,
  clientesActuales: z.string(),
  meseroAsignado: z.string(),
  consumoActual: z.string(),
  duracionEstimada: z.string(),
  pedidos: z.array(pedidoSchema),
});

export const dashboardMesaSchema = z.array(
  mesaSchema.pick({
    id: true,
    numero: true,
    capacidad: true,
    estado: true,
  }),
);

export type Mesa = z.infer<typeof mesaSchema>;
export type MesaFormData = Pick<Mesa, 'numero' | 'capacidad'>;