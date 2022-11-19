import Joi from 'joi';

const id = Joi.number().integer();
const description = Joi.string().max(500);
const status = Joi.string();

const searchTask = Joi.object({
  id: id.required(),
});

const createTask = Joi.object({
  description: description.required(),
});

const updateTask = Joi.object({
  description,
  status,
});

export { searchTask, createTask, updateTask };
