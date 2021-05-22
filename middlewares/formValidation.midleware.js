import Joi from "joi"

const shortStr = Joi.string().max(100);
const longStr = Joi.string().max(2000);
const email = Joi.string().min(3).max(50).required();
const password = Joi.string().max(50).required();

export const newUserValidation = (req, res, next) => {
  const schema = Joi.object({
    fName: shortStr.required(),
    lName: shortStr.required(),
    email,
    password,
    address:longStr.required()
  });

  //validation
  schema.validate(req.body);

  if (schema.validate(req.body).error) {
    return res.json({
      status: "error",
      message: value.error.message,
    });
  }

  next();
};

export const loginValidation = (req, res, next) => {
  const schema = Joi.object({ email, password });

  //validation
  const value = schema.validate(req.body);

  if (value.error) {
    return res.json({
      status: "error",
      message: value.error.message,
    });
  }

  next();
};