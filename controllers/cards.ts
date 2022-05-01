import { Request, Response } from "express";
import { where } from "sequelize/types";
import Card from "../models/card";

// export interface Card {
//   name: string;
//   hp: number;
//   isFirstEdition: boolean;
//   expansion: string;
//   rarity: string;
//   price: number;
//   img: string;
//   creationDate: Date;
//   createdAt?: Date;
//   updatedAt?: Date;
//   deletedAt?: Date;
// }

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

    res.json({
      totalCards,
      cards,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Unexpected error",
    });
  }
};

export const getCard = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const card = await Card.findOne({ where: { id, deletedAt: null } });

    if (card) {
      res.json(card);
    } else {
      res.status(404).json({
        msg: "card does not exists",
      });
    }
  } catch (error) {
    res.status(500).json({
      msg: "Unexpected error",
    });
  }
};

export const postCard = async (req: Request, res: Response) => {
  const { body } = req;
  console.log(body)

  body.creationDate = Date.now();

  console.log(body)

  try {
    const card = await Card.create(body);

    console.log(card)
    res.status(201).json({
      msg: "Card created",
      card,
    });
  } catch (error) {
    console.log(error)
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

    if (card) {
      res.json({
        msg: "Card updated",
        card,
      });
    } else {
      res.status(404).json({
        msg: "Card does not exists",
      });
    }
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
      { deletedAt: Date.now() },
      { where: { id, deletedAt: null } }
    );

    if (card) {
      res.json({
        msg: "Card deleted",
        card,
      });
    } else {
      res.status(404).json({
        msg: "Card does not exists",
      });
    }
  } catch (error) {
    res.status(500).json({
      msg: "Unexpected error",
    });
  }
};
