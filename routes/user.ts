import { Router } from "express";
import { body } from "express-validator";
import passport from "passport";
import { postLogin, postLogout, postRegister } from "../controllers/users";
import validateFields from "../middlewares/validateFields";
import {
  checkAuthenticated,
  checkNotAuthenticated,
} from "../middlewares/validateUser";

const router = Router();

//POST
router.post(
  "/login",
  [
    checkNotAuthenticated,
    body("username", "Username must be included").notEmpty().isString(),
    body("password", "Password must be al least 6 characters long")
      .notEmpty()
      .isString()
      .isLength({ min: 6 }),
    passport.authenticate("local"),
    validateFields,
  ],
  postLogin
);

router.post("/logout", checkAuthenticated, postLogout);

router.post(
  "/register",
  [
    checkNotAuthenticated,
    body("username", "Username must be included").notEmpty().isString(),
    body("password", "Password must be included").notEmpty().isString(),
    validateFields,
  ],
  postRegister
);

export default router;
