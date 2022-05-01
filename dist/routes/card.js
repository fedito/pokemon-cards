"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const cards_1 = require("../controllers/cards");
const validateFields_1 = __importDefault(require("../middlewares/validateFields"));
const validateUser_1 = require("../middlewares/validateUser");
const router = express_1.Router();
//GET
router.get("/", validateUser_1.checkAuthenticated, cards_1.getCards);
router.get("/:id", validateUser_1.checkAuthenticated, cards_1.getCard);
//POST
router.post("/", [
    validateUser_1.checkAuthenticated,
    express_validator_1.body("name", "Name must be included").notEmpty().isString(),
    express_validator_1.body("hp", "Hp must be multiple of 10")
        .notEmpty()
        .isNumeric()
        .isDivisibleBy(10),
    express_validator_1.body("isFirstEdition", "IsFirstEdition must be included")
        .notEmpty()
        .isBoolean(),
    express_validator_1.body("expansion", "Expansion must be included").notEmpty().isString(),
    express_validator_1.body("rarity", "rarity must be included").notEmpty().isString(),
    express_validator_1.body("price", "price must be included").notEmpty().isNumeric(),
    express_validator_1.body("img", "img must be included").notEmpty().isString(),
    validateFields_1.default,
], cards_1.postCard);
//PUT
router.put("/:id", [
    validateUser_1.checkAuthenticated,
    express_validator_1.body("name").isString(),
    express_validator_1.body("hp", "Hp must be multiple of 10").isNumeric().isDivisibleBy(10),
    express_validator_1.body("isFirstEdition").isBoolean(),
    express_validator_1.body("expansion").isString(),
    express_validator_1.body("rarity").isString(),
    express_validator_1.body("price").isNumeric(),
    express_validator_1.body("img").isString(),
    validateFields_1.default,
], cards_1.putCard);
//DELETE
router.delete("/:id", validateUser_1.checkAuthenticated, [], cards_1.deleteCard);
exports.default = router;
//# sourceMappingURL=card.js.map