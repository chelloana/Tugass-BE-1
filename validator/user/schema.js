const Joi = require("joi");

const userCreateSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  fullname: Joi.string().min(3).required(),
  shortname: Joi.string().min(3).required(),
  biodata: Joi.string().min(3).required(),
  jabatan: Joi.string().min(3).required(),
}).unknown();

const userUpdateSchema = Joi.object({
  id: Joi.number().integer().required(),
  fullname: Joi.string().min(3).required(),
  shortname: Joi.string().min(3).required(),
  biodata: Joi.string().min(3).required(),
  jabatan: Joi.string().min(3).required(),

}).unknown();

const filePhotoSchema = Joi.object({
  fieldname: Joi.string().required(),
  mimetype : Joi.string().valid("image/jpeg", "image/png").required(),
}).unknown();

module.exports = {
    userCreateSchema,
    userUpdateSchema, filePhotoSchema
}