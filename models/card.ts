import { DataTypes } from "sequelize";
import db from "../db/connection";

const Card = db.define(
  "Card",
  {
    name: {
      type: DataTypes.STRING,
    },
    hp: {
      type: DataTypes.NUMBER,
    },
    isFirstEdition: {
      type: DataTypes.BOOLEAN,
    },
    expansion: {
      type: DataTypes.STRING,
    },
    rarity: {
      type: DataTypes.STRING,
    },
    price: {
      type: DataTypes.FLOAT,
    },
    img: {
      type: DataTypes.STRING,
    },
    creationDate: {
      type: DataTypes.DATE,
    },
    deletedAt: {
      type: DataTypes.DATE,
    },
  },
  {
    underscored: true,
  }
);

export default Card;