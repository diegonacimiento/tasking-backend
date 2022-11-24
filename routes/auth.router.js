import express from 'express';
import passport from 'passport';
import authService from '../services/auth.service.js';
import validatorHandler from '../middlewares/validator.handler.js';
import { updateUser, recoveryUser, recoveryPassword } from '../schemas/usuarios.schema.js';

const router = express.Router();
const service = new authService();

router.post(
  '/login',
  passport.authenticate('local', { session: false }),
  async (req, res, next) => {
    try {
      const user = req.user;
      res.json(await service.signToken(user));
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/recoveryPassword',
  async (req, res, next) => {
    try {
      const { email } = req.body;

      const response = await service.sendRecovery(email);

      res.json(response);
    } catch (error) {
      next(error);
    };
  }
);

router.post(
  '/newPassword',
  validatorHandler(recoveryPassword, "body"),
  async (req, res, next) => {
    try {
      const { recoveryToken, newPassword } = req.body;
      const response = await service.changePassword(recoveryToken, newPassword);
      res.json(response);
    } catch (error) {
      next(error);;
    };
  }
);

router.post(
  "/recoveryUser",
  validatorHandler(recoveryUser, "body"),
  async (req, res, next) => {
    try {
      const { email, password } = req.body;

      const user = await service.recoveryUser(email, password);

      res.status(201).json({
        message: "Usuario recuperado",
        user,
      });

    } catch (error) {

      next(error);

    };
  }
);

export default router;
