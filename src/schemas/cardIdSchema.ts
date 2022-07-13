import Joi from 'joi';

const cardIdSchema = Joi.object({

    cardId: Joi.number().required()

});

export default cardIdSchema;