import Joi from 'joi';

const id = Joi.number().integer();
const title = Joi.string().min(1).max(30);
const description = Joi.string().max(500);

const searchTask = Joi.object({
  id: id.required(),
});

const createTask = Joi.object({
  title: title.required(),
  description,
});

const updateTask = Joi.object({
  title,
  description,
});

export { searchTask, createTask, updateTask };
