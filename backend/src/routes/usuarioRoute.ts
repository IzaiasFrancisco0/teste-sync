import { Router, Request, Response, NextFunction, RequestHandler } from 'express';
import multer from 'multer';
import path from 'path';

import { usuarioController } from '../controllers/usuarioController.js';
import { validate } from '../middlewares/validate.js';
import { usuarioInputSchema } from '../schemas/usuarioSchema.js';

const router = Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(process.cwd(), 'uploads'));
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

const asyncHandler = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
): RequestHandler => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};

router.get('/', asyncHandler(usuarioController.index));
router.get('/:id', asyncHandler(usuarioController.show));

router.post(
  '/',
  upload.single('imagem'),
  validate(usuarioInputSchema),
  asyncHandler(usuarioController.create)
);

router.put(
  '/:id',
  upload.single('imagem'),
  validate(usuarioInputSchema),
  asyncHandler(usuarioController.update)
);

router.delete('/:id', asyncHandler(usuarioController.destroy));

export default router;
