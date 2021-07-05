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
    // Gotten from Strapi
    question: string;
    outcomes: string[];
    description: string;
    market_type: string;
    // Only for scalar markets
    upper_bound: string;
    lower_bound: string;
}

export interface MarketMetadata {
    id: number;
    question: string;
    conditionId: string;
    slug: string;
    twitter_card_image: string;
    resolution_source: string;
    end_date: string;
    category: string;
    amm_type: string;
    liquidity: string;
    sponsor_name: string;
    sponsor_image: string;
    start_date: string;
    x_axis_value: string;
    y_axis_value: string;
    denomination_token: string;
    fee: string;
    image: string;
    icon: string;
    lower_bound: string;
    upper_bound: string;
    description: string;
    tags: string[];
    outcomes: string[];
    outcomePrices: string[];
    volume: string;
    active: boolean;
    market_type: string;
    format_type: string;
    lower_bound_date: string;
    upper_bound_date: string;
    closed: boolean;
    marketMakerAddress: string;
    created_at: string;
    updated_at: string;
    closed_time: string;
    wide_format: string;
    new: boolean;
    sent_discord: boolean;
    mailchimp_tag: string;
    featured: boolean;
  }