import { ZodSchema } from 'zod';
import { Request, Response, NextFunction, RequestHandler } from 'express';

export const validate = (schema: ZodSchema): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction) => {
    const resultado = schema.safeParse(req.body);

    if (!resultado.success) {
      console.log('Zod erro detalhado:', resultado.error.format());
      return void res.status(400).json({
        message: 'Dados inválidos',
        errors: resultado.error.errors,
      });
    }

    req.body = resultado.data;
    return next();
  };
};
