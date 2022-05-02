import { Router } from "express";
import { body } from "express-validator";
import {
  getCards,
  getCard,
  postCard,
  putCard,
  deleteCard,
} from "../controllers/cards";
import validateFields from "../middlewares/validateFields";
import { checkAuthenticated } from "../middlewares/validateUser";

const router = Router();

//GET
router.get("/", checkAuthenticated, getCards);
router.get("/:id", checkAuthenticated, getCard);

//POST
router.post(
  "/",
  [
    checkAuthenticated,
    body("name", "Name must be included").notEmpty().isString(),
    body("hp", "Hp must be multiple of 10")
      .notEmpty()
      .isNumeric()
      .isDivisibleBy(10),
    body("isFirstEdition", "IsFirstEdition must be included")
      .notEmpty()
      .isBoolean(),
    body("expansion", "Expansion must be included").notEmpty().isString(),
    body("rarity", "rarity must be included").notEmpty().isString(),
    body("price", "price must be included").notEmpty().isNumeric(),
    body("img", "img must be included").notEmpty().isString(),
    validateFields,
  ],
  postCard
);

//PUT
router.put(
  "/:id",
  [
    checkAuthenticated,
    body("name").optional().isString(),
    body("hp", "Hp must be multiple of 10").optional().isNumeric().isDivisibleBy(10),
    body("isFirstEdition").optional().isBoolean(),
    body("expansion").optional().isString(),
    body("rarity").optional().isString(),
    body("price").optional().isNumeric(),
    body("img").optional().isString(),
    validateFields,
  ],
  putCard
);

//DELETE
router.delete("/:id", checkAuthenticated, [], deleteCard);

export default router;
