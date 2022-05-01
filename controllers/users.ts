import { Request, Response } from "express";
import bcrypt from "bcryptjs";

import User from "../models/user";

export const postLogin = async (req: Request, res: Response) => {
  try {
    res.json({
      msg: `User ${req.user?.username} logged in`,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Unexpected error",
    });
  }
};
export const postLogout = async (req: Request, res: Response) => {
  try {
    const user = req.user?.username;
    req.logOut();
    res.json({
      msg: `User ${user} logged out`,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Unexpected error",
    });
  }
};

export const postRegister = async (req: Request, res: Response) => {
  const { body } = req;
  const username: string = body.username;

  try {
    const userInUse = await User.findOne({ where: { username } });

    if (userInUse) {
      return res.status(400).json({
        msg: `User ${username} already exists`,
      });
    }

    const hashedPassword = await bcrypt.hash(body.password, 10);

    const user = await User.create({
      username,
      password: hashedPassword,
    });

    res.json({
      msg: `User ${user.username} registered`,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Unexpected error",
    });
  }
};
