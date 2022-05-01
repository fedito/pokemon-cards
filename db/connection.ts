import { Sequelize } from "sequelize";

const db = new Sequelize("pokemon-cards", "root", "mysql", {
  host: "localhost",
  dialect: "mysql",
  logging: false,
});

export default db;
