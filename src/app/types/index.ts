import { z } from 'zod';

/** Plato schema */

export const platoSchema = z.object({
  id: z.string(),
  codigo: z.string(),
  nombre: z.string(),
  descripcion: z.string(),
  precio: z.string(),
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
