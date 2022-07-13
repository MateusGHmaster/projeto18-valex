import Joi from 'joi';

const postNewPaymentSchema = Joi.object({

    cardId: Joi.number().required(),
    password: Joi.string().pattern(/\d{4}/).required(),
    businessId: Joi.number().required(),
    amount: Joi.number().greater(0).required()

});

export default postNewPaymentSchema;