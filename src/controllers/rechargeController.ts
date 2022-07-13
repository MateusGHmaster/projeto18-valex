import { Request, Response } from 'express';
import { rechargeService } from '../services/rechargeService.js';

export async function rechargeCard (req: Request, res: Response) {
    
    const key = req.headers['x-api-key'].toString();
    const { cardId, amount } : { cardId: number, amount: number } = req.body;
    
    await rechargeService.cardRecharge(key, cardId, amount);

    res.sendStatus(200);

}