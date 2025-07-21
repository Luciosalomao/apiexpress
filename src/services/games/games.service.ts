import {
  getAllGames,
  getGameById,
  createGame,
  updateGame,
  deleteGame,
} from "../../repositories/games/games.repository";
import { Game } from "../../entities/games/games.entity";

export const listarGames = async (): Promise<Game[]> => {
  return await getAllGames();
};

export const buscarGamePorId = async (id: number): Promise<Game | null> => {
  return await getGameById(id);
};

export const criarGame = async (game: Omit<Game, "id">): Promise<number> => {
  return await createGame(game);
};

export const atualizarGame = async (
  id: number,
  game: Partial<Omit<Game, "id">>
): Promise<boolean> => {
  return await updateGame(id, game);
};

export const excluirGame = async (id: number): Promise<boolean> => {
  return await deleteGame(id);
};
