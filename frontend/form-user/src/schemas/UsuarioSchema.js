// src/schemas/userSchema.ts
import { z } from 'zod';

export const UserSchema = z.object({
  imagem: z.instanceof(File),
  nome: z.string().min(2).max(16),
  idade: z.coerce.number().min(1).max(120),
  rua: z.string().min(1),
  bairro: z.string().min(1),
  estado: z.string().min(1),
  biografia: z.string().min(1),
});
