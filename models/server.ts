import express, { Application } from "express";
import cardRoutes from "../routes/cardRoutes";
import cors from "cors";
import db from "../db/connection";

class Server {
  private app: Application;
  private port: string;
  private paths = {
    cards: "/api/cards",
  };

  constructor() {
    this.app = express();
    this.port = process.env.PORT || "8000";

    this.dbConnection();

    this.middlewares();

    this.routes();
  }

  async dbConnection() {
    try {
      await db.authenticate();
      console.log("DB Online");
    } catch (error) {
      throw new Error();
    }
  }
  
  middlewares() {
    //CORS
    this.app.use(cors());

    //bodyParser
    this.app.use(express.json());

    //public folder
    this.app.use(express.static("public"));
  }

  routes() {
    this.app.use(this.paths.cards, cardRoutes);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server running on port: ${this.port}`);
    });
  }
}

export default Server;
