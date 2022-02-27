import { celebrate, Joi } from 'celebrate';

export const UserCreateSchema = Joi.object().keys({
    email: Joi.string().email().required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    password: Joi.string().required(),
});

export const UserCreateValidation = celebrate(
    { body: UserCreateSchema },
    { abortEarly: false, convert: true },
);

export const UserLoginSchema = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});

export const UserLoginValidation = celebrate(
    { body: UserLoginSchema },
    { abortEarly: false, convert: true },
);
