import express from "express";
import usuariosRouter from "./usuarios.router.js";
import tasksRouter from "./tasks.router.js";
import authRouter from "./auth.router.js";

function routerApi(app) {
  const router = express.Router();
  app.use("/api/v1", router);

  router.use("/usuarios", usuariosRouter);
  router.use("/tareas", tasksRouter);
  router.use("/auth", authRouter);
};

export default routerApi;
