import express from "express";
import passport from "passport";
import usersService from "../services/users.service.js";

const router = express.Router();
const service = new usersService();

router.get(
  "mi-perfil",
  passport.authenticate("jwt", { session:false }),
  async (req, res, next) => {
    try {
      const user = req.user;
      const myUser = await service.search(user.sub);
      res.json(tasks);
    } catch (error) {
      next(error);
    };
  }
  );


