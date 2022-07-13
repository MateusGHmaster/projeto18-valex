import { utils } from '../utils/otherUtils.js';
import * as rechargeRepository from '../repositories/rechargeRepository.js';

async function cardRecharge (key: string, cardId: number, amount: number) {

    await utils.checkForCompany(key);

    const card = await utils.checkForCard(cardId);
    await utils.checkIfActivatedCard(card.password);
    await utils.checkIfExpiredCard(card.expirationDate);

    const rechargeInfo = { cardId, amount };
    await rechargeRepository.insert(rechargeInfo);

}

export const rechargeService = {

    cardRecharge

}
