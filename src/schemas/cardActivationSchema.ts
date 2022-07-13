import Joi from 'joi';

const cardActivationSchema = Joi.object({

    cardId: Joi.number().required(),
    securityCode: Joi.string().regex(/^\d{3}$/).required(),
    password: Joi.string().regex(/^\d{3}$/).required()

});

export default cardActivationSchema;