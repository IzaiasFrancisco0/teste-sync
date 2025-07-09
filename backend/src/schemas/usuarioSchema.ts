import { z } from 'zod';

export const usuarioInputSchema = z.object({
  nome: z.string().min(1),
idade: z.coerce.number().int().min(1).max(120),
  rua: z.string().min(1),
  bairro: z.string().min(1),
  estado: z.string().min(1),
  biografia: z.string().min(1),
});

export type UsuarioInput = z.infer<typeof usuarioInputSchema>;
