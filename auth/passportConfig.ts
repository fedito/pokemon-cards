import { Strategy } from "passport-local";
import bcrypt from "bcryptjs";
import User from "../models/user";
import { PassportStatic, use } from "passport";
import { Identifier } from "sequelize/types";

const initialize = (passport: PassportStatic) => {
  const authenticateUser = async (
    username: string,
    password: string,
    done: Function
  ) => {
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return done(null, false, { msg: "User does not exists" });
    }
    try {
      if (await bcrypt.compare(password, user.password)) {
        return done(null, user);
      } else {
        return done(null, false, { msg: "Incorrect password" });
      }
    } catch (error) {
      return done(error);
    }
  };
  passport.use(new Strategy(authenticateUser));

  passport.serializeUser((user: any, done) => done(null, user.id));
  passport.deserializeUser(async (id: Identifier, done) => {
    const user = await User.findByPk(id);
    return done(null, user);
  });
};

export default initialize;
