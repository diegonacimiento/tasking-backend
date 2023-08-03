import express from 'express';
import usersService from '../services/users.service.js';
import {
  createUser,
  updateUser,
  updatePassword,
} from '../schemas/users.schema.js';
import validatorHandler from '../middlewares/validator.handler.js';
import passport from 'passport';

const router = express.Router();
const service = new usersService();

router.get(
  '/',
  passport.authenticate("jwt", { session:false }),
  async (req, res, next) => {
    try {
      const userId = req.user.sub;
      const user = await service.searchId(userId);
      res.json(user);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/create',
  validatorHandler(createUser, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newUser = await service.create(body);
      res.status(201).json({
        message: 'Usuario creado',
        newUser,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  '/editar',
  passport.authenticate("jwt", { session:false }),
  validatorHandler(updateUser, 'body'),
  async (req, res, next) => {
    try {
      const userId = req.user.sub;
      const body = req.body;
      const updateUser = await service.update(userId, body);
      res.json({
        message: 'Usuario actualizado',
        updateUser,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  '/editar-password',
  passport.authenticate("jwt", { session:false }),
  validatorHandler(updatePassword, 'body'),
  async (req, res, next) => {
    try {
      const userId = req.user.sub;
      const body = req.body;
      const response = await service.updatePassword(userId, body);
      res.json(response);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  '/eliminar',
  passport.authenticate("jwt", { session:false }),
  async (req, res, next) => {
    try {
      const userId = req.user.sub;
      await service.delete(userId);
      res.json({
        message: 'Usuario eliminado',
        userId,
      });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
