import { Request, Response } from 'express';
import { paymentService } from '../services/paymentService.js';

export async function postNewPayment (req: Request, res: Response) {
  
    const { cardId, password, businessId, amount } : { cardId: number, password: string, businessId: number, amount: number } = req.body;

    await paymentService.postNewPayment(cardId, password, businessId, amount);
    
    res.sendStatus(201);

}
