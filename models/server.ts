import express, { Application } from "express";
import cardRoutes from "../routes/card";
import authRoutes from "../routes/user";
import cors from "cors";
import db from "../db/connection";
import bodyParser from "body-parser";
import session from "express-session";
import passport from "passport";
import swaggerUI from "swagger-ui-express";
import initialize from "../auth/passportConfig";
import * as swaggerDocument from "../swagger.json";
import { errorHandler } from "../errors/errorHandler";
import { ErrorCode } from "../errors/errorCode";
import { ErrorException } from "../errors/errorException";

class Server {
  private app: Application;
  private port: string;
  private secret: string;
  private paths = {
    cards: "/api/cards",
    auth: "/api/auth",
    swagger: "/swagger",
  };

  constructor() {
    this.app = express();
    this.port = process.env.PORT || "8000";
    this.secret = process.env.SESSION_SECRET || "secret";

    this.dbConnection();

    this.middlewares();

    this.initializePassport();

    this.routes();

    this.errorHandler()
  }

  async dbConnection() {
    try {
      await db.authenticate();
      console.log("DB Online");
    } catch (error) {
      throw new ErrorException(ErrorCode.UsernameUnavailable);
    }
  }

  initializePassport() {
    initialize(passport);
  }

  middlewares() {
    //CORS
    this.app.use(cors({ credentials: true }));

    //bodyParser
    this.app.use(express.json());
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));

    //passport
    this.app.use(
      session({
        secret: this.secret,
        resave: false,
        saveUninitialized: false,
      })
    );
    this.app.use(passport.initialize());
    this.app.use(passport.session());
  }

  routes() {
    this.app.use(this.paths.cards, cardRoutes);
    this.app.use(this.paths.auth, authRoutes);
    this.app.use(
      this.paths.swagger,
      swaggerUI.serve,
      swaggerUI.setup(swaggerDocument)
    );
  }

  errorHandler() {
    this.app.use(errorHandler)
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server running on port: ${this.port}`);
    });
  }
}

export default Server;
