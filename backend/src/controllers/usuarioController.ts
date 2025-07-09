import { Request, Response, NextFunction } from 'express';
import { RowDataPacket, ResultSetHeader } from 'mysql2';
import { db } from '../database/db.js';
import { z } from 'zod';
import fs from 'fs';
import path from 'path';

const UPLOAD_DIR = path.join(process.cwd(), 'uploads');

export const usuarioController = {
  async index(req: Request, res: Response, next: NextFunction) {
    try {
      const [rows] = await db.execute<RowDataPacket[]>(
        'SELECT id, imagem, nome, idade, rua, bairro, estado, biografia FROM usuarios'
      );
      return res.json(rows);
    } catch (err) {
      return next(err);
    }
  },

  async show(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const [rows] = await db.execute<RowDataPacket[]>(
        `SELECT id, imagem, nome, idade, rua, bairro, estado, biografia 
         FROM usuarios WHERE id = ?`,
        [id]
      );

      if (!rows.length) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
      }

      return res.json(rows[0]);
    } catch (err) {
      return next(err);
    }
  },

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const data = req.body;
      const file = req.file;

      if (!file) {
        return res.status(400).json({ message: 'Imagem é obrigatória' });
      }

      const tiposPermitidos = ['image/jpeg', 'image/png', 'image/webp'];
      if (!tiposPermitidos.includes(file.mimetype)) {
        return res.status(400).json({ message: 'Tipo de imagem inválido' });
      }

      const [result] = await db.execute<ResultSetHeader>(
        `INSERT INTO usuarios 
         (imagem, nome, idade, rua, bairro, estado, biografia) 
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
          file.filename,
          data.nome,
          Number(data.idade),
          data.rua,
          data.bairro,
          data.estado,
          data.biografia,
        ]
      );

      return res.status(201).json({
        id: result.insertId,
        ...data,
        imagem: file.filename,
      });
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ message: 'Dados inválidos', errors: err.errors });
      }
      return next(err);
    }
  },

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const data = req.body;
      const file = req.file;

      const [rows] = await db.execute<RowDataPacket[]>(
        'SELECT imagem FROM usuarios WHERE id = ?',
        [id]
      );

      if (!rows.length) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
      }

      const imagemAtual = rows[0].imagem as string;
      const novaImagem = file ? file.filename : imagemAtual;

      if (file && imagemAtual) {
        const caminhoAntigo = path.join(UPLOAD_DIR, imagemAtual);
        if (fs.existsSync(caminhoAntigo)) fs.unlinkSync(caminhoAntigo);
      }

      await db.execute<ResultSetHeader>(
        `UPDATE usuarios 
         SET imagem = ?, nome = ?, idade = ?, rua = ?, bairro = ?, estado = ?, biografia = ? 
         WHERE id = ?`,
        [
          novaImagem,
          data.nome,
          Number(data.idade),
          data.rua,
          data.bairro,
          data.estado,
          data.biografia,
          id,
        ]
      );

      return res.json({ id, ...data, imagem: novaImagem });
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ message: 'Dados inválidos', errors: err.errors });
      }
      return next(err);
    }
  },

  async destroy(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const [rows] = await db.execute<RowDataPacket[]>(
        'SELECT imagem FROM usuarios WHERE id = ?',
        [id]
      );

      if (!rows.length) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
      }

      const imagem = rows[0].imagem as string;

      const [result] = await db.execute<ResultSetHeader>(
        'DELETE FROM usuarios WHERE id = ?',
        [id]
      );

      if (imagem) {
        const caminhoImagem = path.join(UPLOAD_DIR, imagem);
        if (fs.existsSync(caminhoImagem)) fs.unlinkSync(caminhoImagem);
      }

      return res.json({ message: 'Usuário deletado com sucesso' });
    } catch (err) {
      return next(err);
    }
  }
};
