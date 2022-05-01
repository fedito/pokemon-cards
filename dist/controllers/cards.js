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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCard = exports.putCard = exports.postCard = exports.getCard = exports.getCards = void 0;
const card_1 = __importDefault(require("../models/card"));
const getCards = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const _a = req.query, { limit = 10, offset = 0 } = _a, filteringValues = __rest(_a, ["limit", "offset"]);
    try {
        const [cards, totalCards] = yield Promise.all([
            card_1.default.findAll({
                offset: Number(offset),
                limit: Number(limit),
                where: Object.assign(Object.assign({}, filteringValues), { deletedAt: null }),
            }),
            card_1.default.count(),
        ]);
        res.json({
            totalCards,
            cards,
        });
    }
    catch (error) {
        res.status(500).json({
            msg: "Unexpected error",
        });
    }
});
exports.getCards = getCards;
const getCard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const card = yield card_1.default.findOne({ where: { id, deletedAt: null } });
        if (card) {
            res.json(card);
        }
        else {
            res.status(404).json({
                msg: "card does not exists",
            });
        }
    }
    catch (error) {
        res.status(500).json({
            msg: "Unexpected error",
        });
    }
});
exports.getCard = getCard;
const postCard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    console.log(body);
    body.creationDate = Date.now();
    console.log(body);
    try {
        const card = yield card_1.default.create(body);
        console.log(card);
        res.status(201).json({
            msg: "Card created",
            card,
        });
    }
    catch (error) {
        res.status(500).json({
            msg: "Unexpected error",
        });
    }
});
exports.postCard = postCard;
const putCard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const card = yield card_1.default.update(body, {
            where: {
                id,
                deletedAt: null,
            },
        });
        if (card) {
            res.json({
                msg: "Card updated",
                card,
            });
        }
        else {
            res.status(404).json({
                msg: "Card does not exists",
            });
        }
    }
    catch (error) {
        res.status(500).json({
            msg: "Unexpected error",
        });
    }
});
exports.putCard = putCard;
const deleteCard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const card = yield card_1.default.update({ deletedAt: new Date() }, { where: { id, deletedAt: null } });
        if (card) {
            res.json({
                msg: "Card deleted",
                card,
            });
        }
        else {
            res.status(404).json({
                msg: "Card does not exists",
            });
        }
    }
    catch (error) {
        res.status(500).json({
            msg: "Unexpected error",
        });
    }
});
exports.deleteCard = deleteCard;
//# sourceMappingURL=cards.js.map