import { Request, Response } from "express";
import { ErrorCode } from "../errors/errorCode";
import { ErrorException } from "../errors/errorException";
import Card from "../models/card";

export const getCards = async (req: Request, res: Response) => {
  const { limit = 10, offset = 0, ...filteringValues } = req.query;

  const [cards, totalCards] = await Promise.all([
    Card.findAll({
      offset: Number(offset),
      limit: Number(limit),
      where: {
        ...filteringValues,
        deletedAt: null,
      },
    }),
    Card.count(),
  ]);

  return res.json({
    totalCards,
    cards,
  });
};

export const getCard = async (req: Request, res: Response) => {
  const { id } = req.params;

  const card = await Card.findOne({ where: { id, deletedAt: null } });

  if (!card) {
    throw new ErrorException(ErrorCode.NotFound);
  }

  return res.json(card);
};

export const postCard = async (req: Request, res: Response) => {
  const { body } = req;

  body.creationDate = Date.now();

  const card = await Card.create(body);

  return res.status(201).json(card);
};

export const putCard = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { body } = req;

  const card = await Card.update(body, {
    where: {
      id,
      deletedAt: null,
    },
  });

  if (!card) {
    throw new ErrorException(ErrorCode.NotFound);
  }

  return res.json(card);
};

export const deleteCard = async (req: Request, res: Response) => {
  const { id } = req.params;

  const card = await Card.update(
    { deletedAt: new Date() },
    { where: { id, deletedAt: null } }
  );

  if (!card) {
    throw new ErrorException(ErrorCode.NotFound);
  }

  return res.json(card);
};
