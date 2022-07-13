import Joi from 'joi';

const newCardSchema = Joi.object({

    employeeId: Joi.number().required(),
    cardType: Joi.string().valid("groceries", "restaurants", "transport", "education", "health").required()

});

export default newCardSchema;
