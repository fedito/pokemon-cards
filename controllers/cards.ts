import { Request, Response } from "express";
import Card from "../models/card";

export const getCards = async (req: Request, res: Response) => {
  const { limit = 10, offset = 0, ...filteringValues } = req.query;

  if (filteringValues.isFirstEdition) {
    filteringValues.isFirstEdition =
      filteringValues.isFirstEdition === "true" ? "1" : "0";
  }

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
      Card.count({
        where: {
          ...filteringValues,
          deletedAt: null,
        },
      }),
    ]);

    return res.json({
      totalCards,
      cards,
    });
  } catch (error) {
    return res.status(500).json("Unexpected error");
  }
};

export const getCard = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const card = await Card.findOne({ where: { id, deletedAt: null } });

    if (!card) {
      return res.status(400).json("Invalid card id");
    }

    return res.json(card);
  } catch (error) {
    return res.status(500).json("Unexpected error");
  }
};

export const postCard = async (req: Request, res: Response) => {
  const { body } = req;

  try {
    const card = await Card.create(body);

    return res.status(201).json(card);
  } catch (error) {
    return res.status(500).json("Unexpected error");
  }
};

export const putCard = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { body } = req;

  try {
    const card = await Card.findOne({
      where: {
        id,
        deletedAt: null,
      },
    });
    if (!card) {
      return res.status(400).json("Invalid card id");
    }

    card.set(body);

    await card.save();

    return res.json(card);
  } catch (error) {
    return res.status(500).json("Unexpected error");
  }
};

export const deleteCard = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const card = await Card.findOne({
      where: {
        id,
        deletedAt: null,
      },
    });
    if (!card) {
      return res.status(400).json("Invalid card id");
    }

    card?.set({ deletedAt: new Date() });

    await card?.save();

    return res.json(card);
  } catch (error) {
    return res.status(500).json("Unexpected error");
  }
};
