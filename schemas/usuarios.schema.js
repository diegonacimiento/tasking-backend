import Joi from 'joi';

const id = Joi.string().min(2).max(30);
const email = Joi.string().min(6).email();
const password = Joi.string().min(6).max(100);
const newPassword = Joi.string().min(6).max(100);
const token = Joi.string();
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
  password,
  newPassword,
  token,
  taskId,
});

const recoveryUser = Joi.object({
  email: email.required(),
  password: password.required(),
});

export { searchUser, createUser, updateUser, recoveryUser };
