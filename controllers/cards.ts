import { NextFunction, Request, Response } from "express";
import { ErrorCode } from "../exceptions/errorCode";
import { ErrorException } from "../exceptions/errorException";
import Card from "../models/card";

export const getCards = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { limit = 10, offset = 0, ...filteringValues } = req.query;

    if (filteringValues.isFirstEdition) {
      filteringValues.isFirstEdition =
        filteringValues.isFirstEdition === "true" ? "1" : "0";
    }

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
    next(error);
  }
};

export const getCard = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const card = await Card.findOne({ where: { id, deletedAt: null } });

    if (!card) {
      throw new ErrorException(ErrorCode.InvalidCardId);
    }

    return res.json(card);
  } catch (error) {
    next(error);
  }
};

export const postCard = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { body } = req;

    const card = await Card.create(body);

    return res.status(201).json(card);
  } catch (error) {
    next(error);
  }
};

export const putCard = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { body } = req;

    const card = await Card.findOne({
      where: {
        id,
        deletedAt: null,
      },
    });
    if (!card) {
      throw new ErrorException(ErrorCode.InvalidCardId);
    }

    card.set(body);

    await card.save();

    return res.json(card);
  } catch (error) {
    next(error);
  }
};

export const deleteCard = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const card = await Card.findOne({
      where: {
        id,
        deletedAt: null,
      },
    });
    if (!card) {
      throw new ErrorException(ErrorCode.InvalidCardId);
    }

    card?.set({ deletedAt: new Date() });

    await card?.save();

    return res.json(card);
  } catch (error) {
    next(error);
  }
};
