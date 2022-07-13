import { Response, Request } from 'express';
import { cardService } from '../services/cardService.js';
import { TransactionTypes } from '../repositories/cardRepository.js';

export async function createCard (req: Request, res: Response) {
    
    const key = req.headers['x-api-key'].toString();
    const { employeeId, cardType } : { employeeId: number, cardType: TransactionTypes } = req.body;
    const newCard = await cardService.createCard(key, employeeId, cardType);

    res.status(201).send(newCard);

}

export async function employeeCardActivation (req: Request, res: Response) {
    
    const { cardId, securityCode, password } : { cardId: number, securityCode: string, password: string} = req.body;

    await cardService.employeeCardActivation(cardId, securityCode, password);

    res.sendStatus(200);

}

export async function getBalanceAndTransactionsInfoFromCard (req: Request, res: Response) {
    
    const { cardId } : { cardId: number } = req.body;
    const info = await cardService.getBalanceAndTransactionsInfoFromCard(cardId);

    res.send(info);

}

export async function blockEmployeeCard (req: Request, res: Response) {
    
    const { cardId, password } : { cardId: number, password: string } = req.body;

    await cardService.blockEmployeeCard(cardId, password);

    res.sendStatus(200);

}

export async function unlockEmployeeCard (req: Request, res: Response) {

    const { cardId, password } : { cardId: number, password: string } = req.body;

    await cardService.unlockEmployeeCard(cardId, password);

    res.sendStatus(200);

}
