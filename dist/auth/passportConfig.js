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
const passport_local_1 = require("passport-local");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const user_1 = __importDefault(require("../models/user"));
const initialize = (passport) => {
    const authenticateUser = (username, password, done) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield user_1.default.findOne({ where: { username } });
        if (!user) {
            return done(null, false, { msg: "User does not exists" });
        }
        try {
            if (yield bcryptjs_1.default.compare(password, user.password)) {
                return done(null, user);
            }
            else {
                return done(null, false, { msg: "Incorrect password" });
            }
        }
        catch (error) {
            return done(error);
        }
    });
    passport.use(new passport_local_1.Strategy(authenticateUser));
    passport.serializeUser((user, done) => done(null, user.id));
    passport.deserializeUser((id, done) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield user_1.default.findByPk(id);
        return done(null, user);
    }));
};
exports.default = initialize;
//# sourceMappingURL=passportConfig.js.map