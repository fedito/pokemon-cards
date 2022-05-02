import { Request, Response } from "express";
import bcrypt from "bcryptjs";

import User from "../models/user";
import { ErrorCode } from "../errors/errorCode";
import { ErrorException } from "../errors/errorException";

export const postLogin = async (req: Request, res: Response) => {
  return res.json({
    userId: req.user?.id,
    username: req.user?.username,
  });
};

export const postLogout = async (req: Request, res: Response) => {
  const user = req.user?.username;
  req.logOut();

  return res.json({
    userId: req.user?.id,
    username: req.user?.username,
  });
};

export const postRegister = async (req: Request, res: Response) => {
  const { body } = req;
  const username: string = body.username;

  const userInUse = await User.findOne({ where: { username } });

  if (userInUse) {
    throw new ErrorException(ErrorCode.UsernameUnavailable);
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
};
