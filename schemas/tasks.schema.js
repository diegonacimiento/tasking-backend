import Joi from 'joi';

const id = Joi.number().integer();
const description = Joi.string().max(500);
const isComplete = Joi.boolean();

const searchTask = Joi.object({
  id: id.required(),
});

const createTask = Joi.object({
  description: description.required(),
});

const updateTask = Joi.object({
  description,
  isComplete,
});

export { searchTask, createTask, updateTask };
