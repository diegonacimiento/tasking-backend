import express from 'express';
import usersService from '../services/usuarios.service.js';
import {
  searchUser,
  createUser,
  updateUser,
} from '../schemas/usuarios.schema.js';
import validatorHandler from '../middlewares/validator.handler.js';
import passport from 'passport';

const router = express.Router();
const service = new usersService();

router.get(
  '/:id',
  validatorHandler(searchUser, 'params'),
  passport.authenticate("jwt", { session:false }),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await service.searchId(id);
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
  '/:id',
  validatorHandler(updateUser, 'params'),
  validatorHandler(updateUser, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const updateUser = await service.update(id, body);
      res.json({
        message: 'Usuario actualizado',
        updateUser,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  '/:id',
  validatorHandler(searchUser, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      await service.delete(id);
      res.json({
        message: 'Usuario eliminado',
        id,
      });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
