import express from "express";
import tasksService from "../services/tasks.service.js";
import {
  searchTask,
  createTask,
  updateTask,
} from "../schemas/tasks.schema.js";
import validatorHandler from "../middlewares/validator.handler.js";

const router = express.Router();
const service = new tasksService();

router.get(
  "/",
  async (req, res, next) => {
    try {
      const tasks = await service.search();
      res.json(tasks);
    } catch (error) {
      next(error);
    };
  }
);

router.get(
  "/:id",
  validatorHandler(searchTask, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const task = await service.searchId(id);
      res.json(task);
    } catch (error) {
      next(error);
    };
  }
);

router.post(
  "/create",
  validatorHandler(createTask, "body"),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newTask = await service.create(body);
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
