import { NextFunction, Request, Response } from "express";
import bcrypt from "bcryptjs";

import User from "../models/user";

export const postLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    return res.json({
      userId: req.user?.id,
      username: req.user?.username,
    });
  } catch (error) {
    next(error);
  }
};

export const postLogout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    req.logOut();
    return res.json();
  } catch (error) {
    next(error);
  }
};

export const postRegister = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { body } = req;
    const username: string = body.username;

    const userInUse = await User.findOne({ where: { username } });

    if (userInUse) {
      return res.status(400).json("Username already exists");
    }

    const hashedPassword = await bcrypt.hash(body.password, 10);

    const user = await User.create({
      username,
      password: hashedPassword,
    });

    return res.json({
      userId: user.id,
      username: user.username,
    });
  } catch (error) {
    next(error);
  }
};
