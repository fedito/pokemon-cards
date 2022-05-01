"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postRegister = exports.postLogout = exports.postLogin = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const user_1 = __importDefault(require("../models/user"));
const postLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        res.json({
            msg: `User ${(_a = req.user) === null || _a === void 0 ? void 0 : _a.username} logged in`,
        });
    }
    catch (error) {
        res.status(500).json({
            msg: "Unexpected error",
        });
    }
});
exports.postLogin = postLogin;
const postLogout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const user = (_b = req.user) === null || _b === void 0 ? void 0 : _b.username;
        req.logOut();
        res.json({
            msg: `User ${user} logged out`,
        });
    }
    catch (error) {
        res.status(500).json({
            msg: "Unexpected error",
        });
    }
});
exports.postLogout = postLogout;
const postRegister = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const username = body.username;
    try {
        const userInUse = yield user_1.default.findOne({ where: { username } });
        if (userInUse) {
            return res.status(400).json({
                msg: `User ${username} already exists`,
            });
        }
        const hashedPassword = yield bcryptjs_1.default.hash(body.password, 10);
        const user = yield user_1.default.create({
            username,
            password: hashedPassword,
        });
        res.json({
            msg: `User ${user.username} registered`,
        });
    }
    catch (error) {
        res.status(500).json({
            msg: "Unexpected error",
        });
    }
});
exports.postRegister = postRegister;
//# sourceMappingURL=users.js.map