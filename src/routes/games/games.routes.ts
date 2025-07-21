import { Router, Request, Response } from "express";
import {
  listarGames,
  buscarGamePorId,
  criarGame,
  atualizarGame,
  excluirGame,
} from "../../services/games/games.service";
import validadeGame from "../../middleware/games/validadeGame";

const router = Router();

/**
 * @swagger
 * /games:
 *   get:
 *     summary: Retorna a lista de jogos
 *     responses:
 *       200:
 *         description: Lista de jogos retornada com sucesso
 */
router.get("/", async (req: Request, res: Response) => {
  const games = await listarGames();
  res.json(games);
});

router.get("/:id", async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const game = await buscarGamePorId(id);

  if (!game) {
    return res.status(404).json({ message: "Game não encontrado" });
  }

  res.json(game);
});

router.post("/", validadeGame, async (req: Request, res: Response) => {
  const { name, releasy_year, sinopse } = req.body;

  if (!name || !releasy_year || !sinopse) {
    return res.status(400).json({ message: "Dados incompletos" });
  }

  const newId = await criarGame({ name, releasy_year, sinopse });
  res.status(201).json({ message: "Game criado", id: newId });
});

router.put("/:id", async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { name, releasy_year, sinopse } = req.body;

  const sucesso = await atualizarGame(id, { name, releasy_year, sinopse });

  if (!sucesso) {
    return res
      .status(404)
      .json({ message: "Game não encontrado ou nada alterado" });
  }

  res.json({ message: "Game atualizado com sucesso" });
});

router.delete("/:id", async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const sucesso = await excluirGame(id);

  if (!sucesso) {
    return res.status(404).json({ message: "Game não encontrado" });
  }

  res.json({ message: "Game excluído com sucesso" });
});

export default router;
