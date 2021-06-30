/** 
 * This file defines all the possible return types of API => theGraph functions
*/

export interface Account {
    id: string;
    creationTimestamp: string;
    lastSeenTimestamp: string;
    scaledCollateralVolume: string;
    numTrades: string;
    lastTradedTimestamp: string;
}

export interface Transaction {
    id: string;
    type: string;
    market?: {
        id: string
    }
    tradeAmount: string;
    feeAmount: string;
    outcomeIndex: string;
    outcomeTokensAmount: string;
    timestamp: string;
    user?: {
        id: string;
    }
}

export interface FpmmPoolMembership {
    id: string;
    amount: string;
}

export interface AccountMarketPosition {
    id: string;
    market: {
        id: string;
    };
    outcomeIndex: string;
    quantityBought: string;
    quantitySold: string;
    netQuantity: string;
    valueBought: string;
    valueSold: string;
    netValue: string;
    feesPaid: string;
}

export interface Market {
    id: string;
    creator: string;
    creationTimestamp: string;
    creationTransactionHash: string;
    collateralToken: {
        id: string;
    };
    conditions: {
        id: string;
        resolutionTimestamp: string;    // This being null means the market is still live
    };
    fee: string;
    tradesQuantity: string;
    buysQuantity: string;
    sellsQuantity: string;
    liquidityAddQuantity: string;
    liquidityRemoveQuantity: string;
    collateralVolume: string;
    scaledCollateralVolume: string;
    collateralBuyVolume: string;
    scaledCollateralBuyVolume: string;
    collateralSellVolume: string;
    scaledCollateralSellVolume: string;
    feeVolume: string;
    scaledFeeVolume: string;
    liquidityParameter: string;
    scaledLiquidityParameter: string;
    outcomeTokenAmounts: string;
    outcomeTokenPrices: string;
    outcomeSlotCount: string;
    lastActiveDay: string;
    totalSupply: string;
    poolMembers: {
        id: string;
    }[];
}