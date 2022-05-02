import { Dialect, Sequelize } from "sequelize";

const DB_HOST: string = process.env.DB_HOST || "localhost";
const DB_NAME: string = process.env.DB_NAME || "pokemon-cards";
const DB_USER: string = process.env.DB_USER || "root";
const DB_PASSWORD: string = process.env.DB_PASSWORD || "mysql";
const DB_ENGINE: Dialect = (process.env.DB_ENGINE || "mysql") as Dialect;

const db = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: DB_ENGINE,
  logging: false,
});

export default db;