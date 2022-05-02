import { Request, Response } from "express";
import Card from "../models/card";

export const getCards = async (req: Request, res: Response) => {
  const { limit = 10, offset = 0, ...filteringValues } = req.query;

  try {
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

    //poner los return
    return res.json({
      totalCards,
      cards,
    });
  } catch (error) {
    //buscar un error handler
    res.status(500).json({
      msg: "Unexpected error",
    });
  }
};

export const getCard = async (req: Request, res: Response) => {
  const { id } = req.params;

  const card = await Card.findOne({ where: { id, deletedAt: null } });

  if (!card) {
    return res.status(404).json({
      msg: "card does not exists",
    });
  }

  return res.json(card);
};

export const postCard = async (req: Request, res: Response) => {
  const { body } = req;

  body.creationDate = Date.now();

  try {
    const card = await Card.create(body);

    res.status(201).json(card);
  } catch (error) {
    res.status(500).json({
      msg: "Unexpected error",
    });
  }
};

export const putCard = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { body } = req;

  try {
    const card = await Card.update(body, {
      where: {
        id,
        deletedAt: null,
      },
    });

    if (!card) {
      return res.status(404).json({
        msg: "Card does not exists",
      });
    }

    return res.json(card);
  } catch (error) {
    res.status(500).json({
      msg: "Unexpected error",
    });
  }
};

export const deleteCard = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const card = await Card.update(
      { deletedAt: new Date() },
      { where: { id, deletedAt: null } }
    );

    if (!card) {
      return res.status(404).json({
        msg: "Card does not exists",
      });
    }
    return res.json(card);
  } catch (error) {
    res.status(500).json({
      msg: "Unexpected error",
    });
  }
};
