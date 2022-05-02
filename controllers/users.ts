import { Request, Response } from "express";
import bcrypt from "bcryptjs";

import User from "../models/user";

export const postLogin = async (req: Request, res: Response) => {
  return res.json({
    userId: req.user?.id,
    username: req.user?.username,
  });
};

export const postLogout = async (req: Request, res: Response) => {

  req.logOut();
  return res.json();
};

export const postRegister = async (req: Request, res: Response) => {
  const { body } = req;
  const username: string = body.username;

  try {
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
    return res.status(500).json("Unexpected error");
  }
};
