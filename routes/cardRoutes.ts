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

const router = Router();

//GET
router.get("/", getCards);
router.get("/:id", getCard);

//POST
router.post(
  "/",
  [
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
    body("name").isString(),
    body("hp", "Hp must be multiple of 10").isNumeric().isDivisibleBy(10),
    body("isFirstEdition").isBoolean(),
    body("expansion").isString(),
    body("rarity").isString(),
    body("price").isNumeric(),
    body("img").isString(),
    validateFields,
  ],
  putCard
);

//DELETE
router.delete("/:id", [], deleteCard);

export default router;
