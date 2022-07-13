import { utils } from '../utils/otherUtils.js';
import * as paymentRepository from '../repositories/paymentRepository.js';
import * as rechargeRepository from '../repositories/rechargeRepository.js';

async function postNewPayment (cardId: number, password: string, businessId: number, amount: number) {
    
    const card = await utils.checkForCard(cardId);
    await utils.checkIfActivatedCard(card.password);
    await utils.checkIfExpiredCard(card.expirationDate);
    await utils.checkIfBlockedCard(card);
    await utils.checkPassword(password, card);

    const business = await utils.checkIfRegisteredBusiness(businessId);
    await utils.checkIfBusinessLinkedToCardByType(card.type, business.type);

    const payments = await paymentRepository.findByCardId(cardId);

    const recharges = await rechargeRepository.findByCardId(cardId);

    const balance = await utils.getCardBalance(payments, recharges);
    await utils.checkBalance(balance, amount);
  
    const paymentData = { cardId, businessId, amount };
    await paymentRepository.insert(paymentData);
  
    return;

}

export const paymentService = {

    postNewPayment

};
