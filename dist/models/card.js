"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const Card = connection_1.default.define("Card", {
    id: {
        primaryKey: true,
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
    },
    hp: {
        type: sequelize_1.DataTypes.NUMBER,
    },
    isFirstEdition: {
        type: sequelize_1.DataTypes.BOOLEAN,
    },
    expansion: {
        type: sequelize_1.DataTypes.STRING,
    },
    rarity: {
        type: sequelize_1.DataTypes.STRING,
    },
    price: {
        type: sequelize_1.DataTypes.FLOAT,
    },
    img: {
        type: sequelize_1.DataTypes.STRING,
    },
    creationDate: {
        type: sequelize_1.DataTypes.DATE,
    },
    deletedAt: {
        type: sequelize_1.DataTypes.DATE,
    },
}, {
    underscored: true,
});
exports.default = Card;
//# sourceMappingURL=card.js.map