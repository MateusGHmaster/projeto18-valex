import { Router } from 'express';
import apiKeyMiddleware from '../middlewares/apiKeyMiddleware.js';
import newCardSchema from '../schemas/newCardSchema.js';
import cardActivationSchema from '../schemas/cardActivationSchema.js';
import cardIdSchema from '../schemas/cardIdSchema.js';
import passwordAndCardIdSchema from '../schemas/passwordAndCardIdSchema.js';
import schemaValidate from '../middlewares/schemaValidate.js';
import {
    createCard,
    getBalanceAndTransactionsInfoFromCard, 
    employeeCardActivation,
    blockEmployeeCard,
    unlockEmployeeCard 
} from '../controllers/cardController.js';

const cardRouter = Router();

cardRouter.post('/card-creation', apiKeyMiddleware, schemaValidate(newCardSchema), createCard);

cardRouter.post('/card-activation', schemaValidate(cardActivationSchema), employeeCardActivation);

cardRouter.post('/transactions', schemaValidate(cardIdSchema), getBalanceAndTransactionsInfoFromCard);

cardRouter.post('/card-blocking', schemaValidate(passwordAndCardIdSchema), blockEmployeeCard);

cardRouter.post('/card-unlocking', schemaValidate(passwordAndCardIdSchema), unlockEmployeeCard);

export default cardRouter;
