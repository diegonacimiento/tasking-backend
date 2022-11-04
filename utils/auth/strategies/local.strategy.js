import { Strategy } from "passport-local";
import authService from "../../../services/auth.service.js";

const service = new authService();

const localStrategy = new Strategy(async (email, password, done) => {
  try {
    const user = await service.getUser(email, password);

    done(null, user);

  } catch (error) {

    done(error, false);

  }
});

export default localStrategy;
