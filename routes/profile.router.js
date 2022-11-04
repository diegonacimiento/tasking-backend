import express from "express";
import passport from "passport";
import tasksService from "../services/tasks.service.js";

const router = express.Router();
const service = new tasksService();

router.get(
  "mis-tareas",
  passport.authenticate("jwt", { session:false }),
  async (req, res, next) => {
    try {
      const user = req.user;
      const tasks = await service.search(user.sub);
      res.json(tasks);
    } catch (error) {
      next(error);
    };
  }
  );
