import { celebrate, Joi } from 'celebrate';

export const UserCreateSchema = Joi.object().keys({
    email: Joi.string().email().required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    password: Joi.string().required(),
});

export const UserCreateValidation = celebrate(
    { body: UserCreateSchema },
    { abortEarly: true, convert: true },
);
