import Joi from 'joi';

const id = Joi.string().min(2).max(30);
const email = Joi.string().min(6).email();
const password = Joi.string().min(6).max(100);
const newPassword = Joi.string().min(6).max(100);
const confirmNewPassword = Joi.string().min(6).max(100);
const recoveryToken = Joi.string();
const taskId = Joi.number();

const searchUser = Joi.object({
  id: id.required(),
});

const createUser = Joi.object({
  id: id.required(),
  email: email.required(),
  password: password.required(),
});

const updateUser = Joi.object({
  id,
  email,
  taskId,
});

const recoveryUser = Joi.object({
  email: email.required(),
  password: password.required(),
});

const recoveryPassword = Joi.object({
  recoveryToken,
  newPassword,
});

const updatePassword = Joi.object({
  password,
  newPassword,
  confirmNewPassword,
});

export { searchUser, createUser, updateUser, recoveryUser, recoveryPassword, updatePassword };
