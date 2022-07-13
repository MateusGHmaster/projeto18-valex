import Joi from 'joi';

const passwordAndCardIdSchema = Joi.object({

    cardId: Joi.number().required(),
    password: Joi.string().pattern(/\d{4}/).required()

});

export default passwordAndCardIdSchema;