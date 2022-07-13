import { Router } from 'express';
import { postNewPayment } from '../controllers/paymentController.js';
import postNewPaymentSchema from '../schemas/postPaymentSchema.js';
import schemaValidate from '../middlewares/schemaValidate.js';

const paymentRouter = Router();

paymentRouter.post('/post-payment', schemaValidate(postNewPaymentSchema), postNewPayment);

export default paymentRouter;