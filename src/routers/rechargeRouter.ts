import { Router } from 'express';
import { rechargeCard } from '../controllers/rechargeController.js';
import apiKeyMiddleware from '../middlewares/apiKeyMiddleware.js'; 
import rechargeSchema from '../schemas/rechargeSchema.js';
import schemaValidate from '../middlewares/schemaValidate.js';

const rechargeRouter = Router();

rechargeRouter.post('/card-recharge', apiKeyMiddleware, schemaValidate(rechargeSchema), rechargeCard);

export default rechargeRouter;