import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import db from "../db/connection";

interface Card
  extends Model<InferAttributes<Card>, InferCreationAttributes<Card>> {
  id: CreationOptional<number>;
  name: string;
  hp: number;
  isFirstEdition: boolean;
  expansion: string;
  rarity: string;
  price: number;
  img: string;
  creationDate: Date;
  deletedAt: CreationOptional<Date | null>;
}

const Card = db.define<Card>(
  "Card",
  {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
    },
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
