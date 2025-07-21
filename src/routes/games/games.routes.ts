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

/**
 * @swagger
 * /games/{id}:
 *   get:
 *     summary: Retorna um jogo específico pelo ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do jogo
 *     responses:
 *       200:
 *         description: Jogo encontrado com sucesso
 *       404:
 *         description: Jogo não encontrado
 */
router.get("/:id", async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const game = await buscarGamePorId(id);

  if (!game) {
    return res.status(404).json({ message: "Game não encontrado" });
  }

  res.json(game);
});

/**
 * @swagger
 * /games:
 *   post:
 *     summary: Cria um novo jogo
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - releasy_year
 *               - sinopse
 *             properties:
 *               name:
 *                 type: string
 *                 example: The Legend of Zelda
 *               releasy_year:
 *                 type: integer
 *                 example: 1986
 *               sinopse:
 *                 type: string
 *                 example: Um herói embarca em uma jornada para salvar o reino de Hyrule.
 *     responses:
 *       201:
 *         description: Game criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Game criado
 *                 id:
 *                   type: integer
 *                   example: 1
 *       400:
 *         description: Dados incompletos
 */
router.post("/", validadeGame, async (req: Request, res: Response) => {
  const { name, releasy_year, sinopse } = req.body;

  if (!name || !releasy_year || !sinopse) {
    return res.status(400).json({ message: "Dados incompletos" });
  }

  const newId = await criarGame({ name, releasy_year, sinopse });
  res.status(201).json({ message: "Game criado", id: newId });
});

/**
 * @swagger
 * /games/{id}:
 *   put:
 *     summary: Atualiza um jogo existente
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do jogo a ser atualizado
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Novo nome do jogo
 *               releasy_year:
 *                 type: integer
 *                 example: 2025
 *               sinopse:
 *                 type: string
 *                 example: Sinopse atualizada do jogo
 *     responses:
 *       200:
 *         description: Game atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Game atualizado com sucesso
 *       404:
 *         description: Game não encontrado ou nada alterado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Game não encontrado ou nada alterado
 */
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

/**
 * @swagger
 * /games/{id}:
 *   delete:
 *     summary: Exclui um jogo pelo ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do jogo a ser excluído
 *     responses:
 *       200:
 *         description: Game excluído com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Game excluído com sucesso
 *       404:
 *         description: Game não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Game não encontrado
 */
router.delete("/:id", async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const sucesso = await excluirGame(id);

  if (!sucesso) {
    return res.status(404).json({ message: "Game não encontrado" });
  }

  res.json({ message: "Game excluído com sucesso" });
});

export default router;
