import { utils } from '../utils/otherUtils.js';
import * as paymentRepository from '../repositories/paymentRepository.js';
import * as rechargeRepository from '../repositories/rechargeRepository.js';

async function postNewPayment (businessId: number, cardId: number, password: string, amount: number) {
    
    const card = await utils.checkForCard(cardId);
    await utils.checkIfActivatedCard(card.password);
    await utils.checkIfExpiredCard(card.expirationDate);
    await utils.checkIfBlockedCard(card);
    await utils.checkPassword(password, card);
    
    const business = await utils.checkIfRegisteredBusiness(businessId);
    await utils.checkIfBusinessLinkedToCardByType(card.type, business.type);

    const payments = await paymentRepository.findByCardId(cardId);

    const recharges = await rechargeRepository.findByCardId(cardId);

    const balance = await utils.getCardBalance(payments, amount);
    await utils.checkBalance(balance, amount);

    const paymentInfo = { cardId, businessId, amount };
    await paymentRepository.insert(paymentInfo);

    return;

}

export const paymentService = {

    postNewPayment

};
