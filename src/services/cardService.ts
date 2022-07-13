import { utils } from '../utils/otherUtils.js';
import * as cardRepository from "../repositories/cardRepository.js";
import * as paymentRepository from "../repositories/paymentRepository.js";
import * as rechargeRepository from "../repositories/rechargeRepository.js";
import { faker } from '@faker-js/faker';
import dayjs from 'dayjs';
import Cryptr from 'cryptr';
import bcrypt from 'bcrypt';

async function createCard (key: string, employeeId: number, cardType: cardRepository.TransactionTypes) {
    
    const cryptr = new Cryptr('encrypted code');

    const company = await utils.checkForCompany(key);
    const employee = await utils.checkForEmployee(employeeId, company.id);

    await utils.checkIfEmployeeCardTypeAlreadyExists(employeeId, cardType);

    const cardNumber = createCardNumber();
    const cardName = formatCardHolderName(employee.fullName);
    const expirationDate = dayjs().add(5, "year").format("MM/YY");
    const securityCode = faker.random.numeric(3);
    const encryptSecurityCode = cryptr.encrypt(securityCode);
  
    const newCard = {

        employeeId: employeeId,
        number: cardNumber,
        cardholderName: cardName,
        securityCode: encryptSecurityCode,
        expirationDate: expirationDate,
        password: null,
        isVirtual: false,
        originalCardId: null,
        isBlocked: true,
        type: cardType,

    };
  
    await cardRepository.insert(newCard);

    return;

}

async function employeeCardActivation (cardId: number, securityCode: string, password: string) {
    
    const card = await utils.checkForCard(cardId);

    await utils.checkIfExpiredCard(card.expirationDate);
    await utils.checkIfInactivatedCard(card.password);
    await utils.checkIfSecurityCodeIsCorrect(securityCode, card);
  
    const passwordHash = bcrypt.hashSync(password, 10);
    const updateData = { password: passwordHash };

    await cardRepository.update(cardId, updateData);

    return;

}

async function getBalanceAndTransactionsInfoFromCard (cardId: number) {

    await utils.checkForCard(cardId);

    const payments = await paymentRepository.findByCardId(cardId);
    const recharges = await rechargeRepository.findByCardId(cardId);
    const balance = await utils.getCardBalance(payments, recharges);
  
    return { balance, transactions: payments, recharges };

}
  
async function blockEmployeeCard (cardId: number, password: string) {

    const card = await utils.checkForCard(cardId);

    await utils.checkIfExpiredCard(card.expirationDate);
    await utils.checkIfBlockedCard(card);
    await utils.checkPassword(password, card);
  
    await cardRepository.update(cardId, { isBlocked: true });

    return;

}
  
async function unlockEmployeeCard (cardId: number, password: string) {

    const card = await utils.checkForCard(cardId);
    await utils.checkIfExpiredCard(card.expirationDate);
    await utils.checkIfUnlockedCard(card);
    await utils.checkPassword(password, card);
  
    await cardRepository.update(cardId, { isBlocked: false });

    return;

}

function createCardNumber () {

    const cardNumber = faker.random.numeric(16);
    const formatedNumber = cardNumber.match(/.{1,4}/g).join(" ");

    return formatedNumber;

}

function formatCardHolderName (fullName: string) {

    const name: string[] = fullName.split(" ");
    let standardName: string = name[0];

    for (let i = 1; i < name.length - 1; i++) {
        if (name[i].length >= 3) standardName += ` ${name[i][0]}`;
    }

    standardName += ` ${name[name.length - 1]}`;
    const formatedName = standardName.toUpperCase();

    return formatedName;

}

export const cardService = {

    createCard,
    employeeCardActivation,
    getBalanceAndTransactionsInfoFromCard,
    blockEmployeeCard,
    unlockEmployeeCard
    
};