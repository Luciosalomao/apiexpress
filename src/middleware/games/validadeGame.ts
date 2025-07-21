import { Request, Response, NextFunction } from "express";

function validadeGame(req: Request, res: Response, next: NextFunction) {
  const { name, releasy_year, sinopse } = req.body;

  if (!name) {
    return res.status(400).json({ error: "Name is required" });
  }

  next();
}

export default validadeGame;
