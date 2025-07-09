import 'dotenv/config';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import usuarioRoute from './routes/usuarioRoute.js';

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

const urlOrigens = [
  'http://localhost:5173',
  process.env.FRONTEND_URL
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || urlOrigens.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Não permitido pelo cors'));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200
}));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/usuarios', usuarioRoute);

app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err);
  res.status(500).json({ message: 'Erro interno do servidor' });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
