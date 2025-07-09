import { ResultSetHeader, RowDataPacket } from 'mysql2';
import { db } from '../database/db.js';
import { Usuario } from '../types/usuario.js';

// CREATE
export async function criarUsuario(
  imagem: string,
  nome: string,
  idade: number,
  rua: string,
  bairro: string,
  estado: string,
  biografia: string
): Promise<number> {
  const [result] = await db.execute<ResultSetHeader>(
    'INSERT INTO usuarios (imagem, nome, idade, rua, bairro, estado, biografia) VALUES (?, ?, ?)',
    [imagem, nome, idade, rua, bairro, estado, biografia],
  );
  return result.insertId;
}

// READ
export async function listarUsuarios(): Promise<Usuario[]> {
  const [rows] = await db.execute<RowDataPacket[]>(
    'SELECT imagem, nome, idade, rua, bairro, estado, biografia FROM usuarios',
  );
  // RowDataPacket[] → cast para User[]
  return rows as Usuario[];
}
