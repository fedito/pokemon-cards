import { NextFunction, Request, Response } from "express";

export const checkAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ msg: `User is not authenticated` });
};

export const checkNotAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.isAuthenticated()) {
    return res
      .status(401)
      .json({ msg: `User: ${req.user.username} is already authenticated` });
  }
  next();
};
