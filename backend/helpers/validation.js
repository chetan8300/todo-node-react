
// Import Joi for Validation
const Joi = require('@hapi/joi');

// User register validation schema
const registerValidationSchema = data => {
  const schema = Joi.object({
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().min(7).alphanum().required(),
  });

  return schema.validate(data, { abortEarly: false });
};

// User login validation schema
const loginValidationSchema = data => {
  const schema = Joi.object({
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().min(7).alphanum().required(),
  });

  return schema.validate(data, { abortEarly: false });
};

const changePasswordValidationSchema = data => {
  const schema = Joi.object({
    oldPassword: Joi.string().min(7).alphanum().required(),
    newPassword: Joi.string().min(7).alphanum().required(),
  });

  return schema.validate(data, { abortEarly: false });
};

const todoCreateSchema = data => {
  const schema = Joi.object({
    task: Joi.string().required(),
  });

  return schema.validate(data, { abortEarly: false });
}

const todoUpdateSchema = data => {
  const schema = Joi.object({
    id: Joi.number().required(),
    task: Joi.string().required(),
    status: Joi.string().required()
  });

  return schema.validate(data, { abortEarly: false });
}


module.exports = {
  registerValidationSchema,
  loginValidationSchema,
  changePasswordValidationSchema,
  todoCreateSchema,
  todoUpdateSchema,
}

