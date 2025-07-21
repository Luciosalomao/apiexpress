import connection from "../../database/connection";
import { Game } from "../../entities/games/games.entity";

export const getAllGames = async (): Promise<Game[]> => {
  const [rows] = await connection.query("SELECT * FROM games");
  return rows as Game[];
};

export const getGameById = async (id: number): Promise<Game | null> => {
  const [rows] = await connection.query("SELECT * FROM games WHERE id = ?", [
    id,
  ]);
  const results = rows as Game[];
  return results.length > 0 ? results[0] : null;
};

export const createGame = async (game: Omit<Game, "id">): Promise<number> => {
  const { name, releasy_year, sinopse } = game;
  const [result] = await connection.query(
    "INSERT INTO games (name, releasy_year, sinopse) VALUES (?, ?, ?)",
    [name, releasy_year, sinopse]
  );
  const insertResult = result as { insertId: number };
  return insertResult.insertId;
};

export const updateGame = async (
  id: number,
  game: Partial<Omit<Game, "id">>
): Promise<boolean> => {
  const fields = [];
  const values = [];

  for (const key in game) {
    fields.push(`${key} = ?`);
    values.push((game as any)[key]);
  }

  if (fields.length === 0) return false;

  values.push(id);

  const [result] = await connection.query(
    `UPDATE games SET ${fields.join(", ")} WHERE id = ?`,
    values
  );

  const updateResult = result as { affectedRows: number };
  return updateResult.affectedRows > 0;
};

export const deleteGame = async (id: number): Promise<boolean> => {
  const [result] = await connection.query("DELETE FROM games WHERE id = ?", [
    id,
  ]);
  const deleteResult = result as { affectedRows: number };
  return deleteResult.affectedRows > 0;
};
