import express from "express";
import tasksService from "../services/tasks.service.js";
import {
  searchTask,
  createTask,
  updateTask,
} from "../schemas/tasks.schema.js";
import validatorHandler from "../middlewares/validator.handler.js";
import passport from "passport";

const router = express.Router();
const service = new tasksService();

router.get(
  "/",
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

router.get(
  "/task",
  passport.authenticate("jwt", { session:false }),
  async (req, res, next) => {
    try {
      const user = req.user;
      const { title } = req.query;
      console.log(title)
      const tasks = await service.searchId(user.sub, title);
      res.json(tasks);
    } catch (error) {
      next(error);
    };
  }
);

router.post(
  "/create",
  passport.authenticate("jwt", { session:false }),
  validatorHandler(createTask, "body"),
  async (req, res, next) => {
    try {
      const user = req.user;
      const body = req.body;
      const newTask = await service.create(user.sub, body);
      res.status(201).json({
        message: "Tarea creada",
        newTask,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  "/:id",
  validatorHandler(updateTask, "params"),
  validatorHandler(updateTask, "body"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const updateTask = await service.update(id, body);
      res.json({
        message: "Tarea actualizada",
        updateTask,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  "/:id",
  validatorHandler(searchTask, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      await service.delete(id);
      res.json({
        message: "Tarea eliminada",
      });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
