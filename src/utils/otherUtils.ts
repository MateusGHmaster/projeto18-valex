import * as businessRepository from '../repositories/businessRepository.js';
import * as cardRepository from '../repositories/cardRepository.js';
import * as companyRepository from '../repositories/companyRepository.js';
import * as employeeRepository from '../repositories/employeeRepository.js';
import * as paymentRepository from '../repositories/paymentRepository.js';
import * as rechargeRepository from '../repositories/rechargeRepository.js';
import Cryptr from 'cryptr';
import bcrypt from 'bcrypt';
import dayjs from 'dayjs';

async function checkIfRegisteredBusiness (businessId: number) {

    const business = await businessRepository.findById(businessId);

    if (!business) {
        throw {
            type: 'not_found',
            message: 'Business not found'
        };
    }
  
    return business;

}

async function checkIfBusinessLinkedToCardByType (cardType: string, businessType: string) {
    
    if (cardType !== businessType) {
        throw {
            type: 'unauthorized',
            message: 'No type match'
        };
    }
  
    return;

}

async function checkForCard (cardId: number) {

    const card = await cardRepository.findById(cardId);

    if (!card) {
        throw {
            type: 'not_found',
            message: 'Card not found'
        };
    }
  
    return card;

}

async function checkIfActivatedCard (cardPassword: string) {

    if (!cardPassword) {
        throw {
            type: 'conflict',
            message: 'Card: not activated'
        };
    }
  
    return;

}

async function checkIfInactivatedCard (cardPassword: string) {

    if (cardPassword) {
        throw {
            type: 'conflict',
            message: 'Card: activated'
        };
    }
  
    return;

}

async function checkIfExpiredCard (expirationDate: string) {

    const date: string[] = expirationDate.split(' / ');
    const month: number = parseInt(date[0]);
    const year: number = parseInt(date[1]);
  
    if (dayjs().year() > 2000 + year) {
        throw {
            type: 'unauthorized',
            message: 'Card: expired'
        };
    }
  
    if (dayjs().year() === 2000 + year && dayjs().month() + 1 > month) {
        throw {
            type: 'unauthorized',
            message: 'Card: expired'
        };
    }
  
    return;

}

async function checkIfBlockedCard (card) {

    if (card.isBlocked === true) {
        throw {
            type: 'conflict',
            message: 'Card: blocked'
        };
    }
  
    return;

}

async function checkIfUnlockedCard (card) {

    if (card.isBlocked === false) {
        throw {
            type: 'conflict',
            message: 'Card: unlocked'
        };
    }
  
    return;

}

async function checkIfSecurityCodeIsCorrect (securityCode: string, card) {

    const cryptr = new Cryptr('encrypted code');

    if (securityCode !== cryptr.decrypt(card.securityCode)) {
        throw {
            type: 'unauthorized',
            message: 'Access: unauthorized'
        };
    }
  
    return;

}

async function checkPassword (password, card) {

    if (!bcrypt.compareSync(password, card.password)) {
        throw {
            type: 'unauthorized',
            message: 'Access: unauthorized'
        };
    }
  
    return;

}

async function checkForCompany (companyKey: string) {

    const company = await companyRepository.findByApiKey(companyKey);

    if (!company) {
        throw {
            type: 'not_found',
            message: 'Company not found'
        };
    }
  
    return company;

}

async function checkForEmployee (employeeId: number, companyId: number) {
    
    const employee = await employeeRepository.findEmployeeAndCompanyById(employeeId, companyId);

    if (!employee) {
        throw {
            type: 'not_found',
            message: 'Employee not found'
        };
    }
  
    return employee;
    
}

async function checkIfEmployeeCardTypeAlreadyExists (employeeId: number, cardType: cardRepository.TransactionTypes) {
    
    const employeeCardWithSameType = await cardRepository.findByTypeAndEmployeeId(cardType, employeeId);
    
    if (employeeCardWithSameType) {
        throw {
            type: 'unauthorized',
            message: 'Card type: already exists'
        };
    }
  
    return;

}

async function getCardBalance (payments, recharges) {

    let totalPayments: number = 0;
    payments.map((payment) => (totalPayments += payment.amount));
  
    let totalRecharges: number = 0;
    recharges.map((recharge) => (totalRecharges += recharge.amount));
  
    const balance = totalRecharges - totalPayments;

    return balance;

}

async function checkBalance (balance, amount) {
    
    if (balance < amount) {
        throw {
            type: 'unauthorized',
            message: 'Balance: not enough'
        };
    }
  
    return;

}

export const utils = {

    checkIfRegisteredBusiness,
    checkIfBusinessLinkedToCardByType,
    checkForCard,
    checkIfActivatedCard,
    checkIfInactivatedCard,
    checkIfExpiredCard,
    checkIfBlockedCard,
    checkIfUnlockedCard,
    checkIfSecurityCodeIsCorrect,
    checkPassword,
    checkForCompany,
    checkForEmployee,
    checkIfEmployeeCardTypeAlreadyExists,
    getCardBalance,
    checkBalance
    
}