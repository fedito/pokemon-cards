"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const passport_1 = __importDefault(require("passport"));
const users_1 = require("../controllers/users");
const validateFields_1 = __importDefault(require("../middlewares/validateFields"));
const validateUser_1 = require("../middlewares/validateUser");
const router = express_1.Router();
//POST
router.post("/login", [
    validateUser_1.checkNotAuthenticated,
    express_validator_1.body("username", "Username must be included").notEmpty().isString(),
    express_validator_1.body("password", "Password must be al least 6 characters long").notEmpty().isString().isLength({ min: 6 }),
    passport_1.default.authenticate("local"),
    validateFields_1.default,
], users_1.postLogin);
router.post("/logout", validateUser_1.checkAuthenticated, users_1.postLogout);
router.post("/register", [
    validateUser_1.checkNotAuthenticated,
    express_validator_1.body("username", "Username must be included").notEmpty().isString(),
    express_validator_1.body("password", "Password must be included").notEmpty().isString(),
    validateFields_1.default,
], users_1.postRegister);
exports.default = router;
//# sourceMappingURL=user.js.map