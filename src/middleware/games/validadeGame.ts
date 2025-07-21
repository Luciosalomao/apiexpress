import { Request, Response, NextFunction } from "express";
const joi = require("joi");

const currentYear = new Date().getFullYear();

const GAME = joi.object({
  name: joi.string().min(3).required().messages({
    "string.base": `"name" deve ser uma string`,
    "string.empty": `"name" não pode ser vazio`,
    "string.min": `"name" deve ter no mínimo {#limit} caracteres`,
    "any.required": `"name" é obrigatório`,
  }),
  releasy_year: joi
    .number()
    .integer()
    .min(1950)
    .max(currentYear)
    .required()
    .messages({
      "number.base": `"releasy_year" deve ser um número`,
      "number.integer": `"releasy_year" deve ser um número inteiro`,
      "number.min": `"releasy_year" deve ser no mínimo 1950`,
      "number.max": `"releasy_year" não pode ser maior que ${currentYear}`,
      "any.required": `"releasy_year" é obrigatório`,
    }),
  sinopse: joi.string().required().messages({
    "string.base": `"sinopse" deve ser uma string`,
    "string.empty": `"sinopse" não pode ser vazia`,
    "string.max": `"sinopse" deve ter no máximo {#limit} caracteres`,
    "any.required": `"sinopse" é obrigatória`,
  }),
});

function validadeGame(req: Request, res: Response, next: NextFunction) {
  const { name, releasy_year, sinopse } = req.body;

  const { error } = GAME.validate(
    { name, releasy_year, sinopse },
    { abortEarly: false }
  );

  if (error) {
    const errors = error.details.map((detail: any) => detail.message);
    return res.status(400).json({ errors });
  }

  next();
}

export default validadeGame;
