Routes: 

- Card:

    /card-creation
        \_body: "emplyeeId", "cardType"

    /card-activation
        \_body: "cardId", "securityCode", "password"

    /transactions
        \_body: "cardId"

    /card-blocking
        \_body: "cardId", "password"

    /card-unlocking
        \_body: "cardId", "password"

--------------------------/--------------------------/--------------------------

- Payment:

    /post-payment
        \_body: "cardId", "password", "businessId", "amount"

--------------------------/--------------------------/--------------------------

- Recharge:

    /card-recharge
        \_body: "cardId", "amount"