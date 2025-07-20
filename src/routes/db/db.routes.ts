import { Router } from "express";
import connection from "../../database/connection";

const router = Router();

router.get("/ping", async (req, res) => {
  try {
    const [rows] = await connection.query("SELECT 1");
    res
      .status(200)
      .json({ status: "Conectado ao banco de dados!", result: rows });
  } catch (error) {
    console.error("Erro ao conectar ao banco:", error);
    res
      .status(500)
      .json({ status: "Erro ao conectar ao banco de dados", error });
  }
});

export default router;
