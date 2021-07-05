import Axios from "axios";
// const Axios = require("axios");
import { Account, Transaction, FpmmPoolMembership, AccountMarketPosition, Market, MarketMetadata } from "./interfaces";
import {getTimestampFromBlocknumber} from "./RPC-matic";

const SUBGRAPH_URL = 'https://api.thegraph.com/subgraphs/name/polymarket/polymarket-matic-trading'
const STRAPI_URL = 'https://strapi-matic.poly.market/markets'

/**
 * Helper function for interacting with TheGraph via http POST
 * @param query - multiline string argument containing the gql query
 * @returns a Promise<JSON> containing the http response to the POST request
 */
async function query_subgraph(query: string) {
    return Axios.post(SUBGRAPH_URL, {
        query: query
    });
}

/**
 * Helper function for interacting with the Strapi API
 * @returns a list of all markets + metadata
 */
async function getStrapiMarketData() {
    return Axios.get(STRAPI_URL);
}

/**
 * Grab all the accounts on Polymarket (general info)
 * @returns a list of Accounts in order of id, where an Account holds basic metadata.  More detailed info (list of txs, pool memberships, etc. can be queried by id)
 */
export async function allAccounts(): Promise<Account[]> {
    var prev_last_id = '0';
    var accounts: Account[] = []
    var done = false;
    while (!done) {
        let query = `query {
            accounts(
                where: {id_gt: "${prev_last_id}"}
                first: 1000
            ){
                id
                creationTimestamp
                lastSeenTimestamp
                scaledCollateralVolume
                lastTradedTimestamp
            }
        }`;
        await query_subgraph(query).then((res) => {
            if (res.data.data.accounts.length == 0) {
                done = true;
                return;
            }

            // Join lists of accounts, ignoring duplicates
            accounts = accounts.concat(res.data.data.accounts);
            prev_last_id = res.data.data.accounts.slice(-1)[0].id;
        })
        .catch((error) => {
            console.log(error);
            throw error;
        });
    }
    return accounts;
}

/**
 * Grab all the transactions (trades) for a given user, sorted by timestamp
 * ALSO, TRADEAMOUNT ISN'T A FLOAT.  
 * TODO: FIGURE OUT IF SHOULD KEEP AS IS OR TURN INTO USD VALUE INSTEAD OF USDC
 * @param userAddress - the matic wallet hash of the target user
 * @returns a list of transactions (txid, type(B or S), marketID, tradeAmount, feesPaid, whatOutcome, howManyOutcomeTokens, timestamp) 
 */
export async function allTradesForUser(userAddress: string): Promise<any> {
    var done = false;
    var prev_timestamp = "0";
    var txs: Transaction[] = [];
    while (!done) {
        let query = `query {
            transactions(
                where: {
                    user: "${userAddress}"
                    timestamp_gt: ${prev_timestamp}
                }
                first: 1000
                orderBy: timestamp
                orderDirection: asc
            ){
                id
                type
                market {
                    id
                }
                tradeAmount
                feeAmount
                outcomeIndex
                outcomeTokensAmount
                timestamp
            }
        }`;
        await query_subgraph(query).then((res) => {
            if (res.data.data.transactions.length == 0) {
                done = true;
                return;
            }

            // Join lists of txs, ignoring duplicates
            txs = txs.concat(res.data.data.transactions);
            prev_timestamp = res.data.data.transactions.slice(-1)[0].timestamp;
        }).catch((error) => {
            console.log(error);
            throw error;
        });
    }
    return txs;
}

/**
 * Grab all the funding actions (removals/additions) a user has done across all markets **NOTE** ASSUMES USER HAS DONE LESS THAN 1000 OF EACH 
 * TODO: FIX THAT                                                                                          ^
 * TODO: Sort by timestamp (order_by isn't working for some reason)
 * TODO: nothing shows up for fpmm???
 * TODO: figure out what the amountsAdded, amountsRefunded, and amountsRemoved mean
 * @param userAddress - the matic wallet hash of the target user
 * @returns one list of fpmmFundingAddition(s) and another of fpmmFundingRemoval(s)
 */
export async function allFundingActionsForUser(userAddress: string): Promise<any> {
    let query = `query {
        fpmmFundingAdditions(
            where: {funder: "${userAddress}"}
            first: 1000
        ){
            id
            fpmm {
                id
            }
            amountsAdded
            amountsRefunded
            sharesMinted
            timestamp
        }
        fpmmFundingRemovals(
            where: {funder: "${userAddress}"}
            first: 1000
        ){
            id
            fpmm {
                id
            }
            amountsRemoved
            collateralRemoved
            sharesBurnt
            timestamp
        }
    }`;
    var fundingData = null;
    await query_subgraph(query).then((res) => {
        fundingData = res.data.data;
    }).catch((error) => {
        console.log(error);
        throw error;
    });
    return fundingData;
}

/**
 * Grabs all the pools the user is a member (LP) of, as well as how many LP tokens they own
 * @param userAddress - the matic wallet hash of the target user
 * @returns one list of fpmmPoolMemberships (poolID, amount)
 */
export async function fpmmPoolMembershipsForUser(userAddress: string) {
    let query = `query {
        fpmmPoolMemberships(
            where: {funder: "${userAddress}"}
            first: 1000
        ){
            id
            amount
        }
    }`;
    var memberships: FpmmPoolMembership[] = [];
    await query_subgraph(query).then((res) => {
        // id gives pool address + funder address (0x...0x...) and we just want pool
        const data = res.data.data.fpmmPoolMemberships;
        for (const poolMembership of data) {
            var newMembership = poolMembership;
            newMembership.id = poolMembership.id.slice(0,42);  // pool addr is 42 chars long
            memberships.push(poolMembership);
        }
    }).catch((error) => {
        console.log(error);
        throw error;
    });
    return memberships;
}

/**
 * Grabs all the current positions of a user, including the market id, amount bought/sold, feespaid, and chosen outcome
 * @param userAddress the wallet address of the target user
 * @returns a list of marketPositions
 */
export async function allPositionsOfUser(userAddress: string) {
    let query = `query {
        marketPositions(
                where: {user: "${userAddress}"}
        ){
            id
            market {
                id
                conditions {
                    id
                    resolutionTimestamp
                    payouts
                }
            }
            outcomeIndex
            quantityBought
            quantitySold
            netQuantity
            valueBought
            valueSold
            netValue
            feesPaid
        }
    }`;
    var positions: AccountMarketPosition[] = [];
    await query_subgraph(query).then((res) => {
        positions = res.data.data.marketPositions;
        // Trim the account address from id (theGraph gives accountID + poolID)
        for (var i = 0; i < positions.length; i++) {
            positions[i].id = positions[i].id.slice(42);
        }
    }).catch((error) => {
        console.log(error);
        throw error;
    });
    return positions;
}

/**
 * Query a list of all the markets on polymarket, live markets have null resolutionTimestamp
 * @returns a list of all markets
 */
export async function allMarkets(): Promise<Market[]> {
    let query = `query {
        fixedProductMarketMakers (
            first:1000
            orderBy: creationTimestamp
            orderDirection: asc
        ) 
        {
            id
            creator
            creationTimestamp
            creationTransactionHash
            collateralToken {
                id
            }
            conditions {
                id
                resolutionTimestamp
                payouts
            }
            fee
            tradesQuantity
            buysQuantity
            sellsQuantity
            liquidityAddQuantity
            liquidityRemoveQuantity
            collateralVolume
            scaledCollateralVolume
            collateralBuyVolume
            scaledCollateralBuyVolume
            collateralSellVolume
            scaledCollateralSellVolume
            feeVolume
            scaledFeeVolume
            liquidityParameter
            scaledLiquidityParameter
            outcomeTokenAmounts
            outcomeTokenPrices
            outcomeSlotCount
            lastActiveDay
            totalSupply
            poolMembers {
                id
            }
        }
    }`;

    // Get markets metadata from Strapi
    var metadata: MarketMetadata[] = [];
    await getStrapiMarketData().then((res) => {
        metadata = res.data;
    }).catch((error) => {
        console.error(error);
        throw error;
    });

    var markets: Market[] = [];
    await query_subgraph(query).then((res) => {
        markets = res.data.data.fixedProductMarketMakers;

        // Trim id of poolmembers (it's pool id + user id) and add metadata
        markets.forEach((market) => {
            market.poolMembers.forEach(poolMember => {
                poolMember.id = poolMember.id.slice(42);
            });

            let curMetadata = metadata.find(o => o.marketMakerAddress.toLowerCase() === market.id);
            if (curMetadata) {
                market.question = curMetadata.question;
                market.outcomes = curMetadata.outcomes;
                market.description = curMetadata.description;
                market.market_type = curMetadata.market_type;
                if (market.market_type === 'scalar') {
                    market.upper_bound = curMetadata.upper_bound;
                    market.lower_bound = curMetadata.lower_bound;
                }
            }
        })
    }).catch((error) => {
        console.error(error);
        throw error;
    });
    return markets;
}

/**
 * Get a list of prices for outcomes on a given market
 * @param marketAddress the address of the market maker
 * @param startBlock the first block in the query range
 * @param endBlock optional - defaults to the block at Date.now(); the final block in the query range
 * @param stepSize optional - defaults to 30; the number of blocks to skip between price lookups
 * @returns a list of prices at each block in the range
 */
export async function pricesForMarket(marketAddress: string, startBlock: number, endBlock?: number, stepSize?: number): Promise<any> {
    if (!stepSize) {
        stepSize = 30;
    }
    let prices: any[] = [];
    for(var i:number = startBlock; i <= endBlock; i += stepSize) {
        let query = `{
            fixedProductMarketMaker(id: "${marketAddress}", block: {number: ${i}}) {
                        outcomeTokenPrices
                    }
                }`;
        await query_subgraph(query).then(async (res) => {
            if (!res.data.data.fixedProductMarketMaker) {
                return;
            }
            const timestamp = await getTimestampFromBlocknumber(i);
            const priceStruct = {
                timestamp: timestamp,
                block: i,
                prices: res.data.data.fixedProductMarketMaker.outcomeTokenPrices
            };
            prices.push(priceStruct);
        }).catch((error) => {
            console.error(error);
            throw error;
        });
    }
    return prices;
}

/**
 * Grab all the trades performed with a given market maker
 * @param marketAddress the address of the market maker
 * @returns a list of Transactions interacting with the market maker
 */
export async function allTradesForMarket(marketAddress:string): Promise<any> {
    let done = false;
    let txs: Transaction[] = [];
    let prev_timestamp = "0";
    while (!done) {
        let query = `query {
            transactions(
                where: {
                    market: "${marketAddress}"
                    timestamp_gt: ${prev_timestamp}
                }
                first:1000
                orderBy: timestamp
                orderDirection: asc
            ) {
                id
                type
                tradeAmount
                feeAmount
                outcomeIndex
                outcomeTokensAmount
                timestamp
                user {
                    id
                }
                market {
                    id
                }
            }
        }`;
        await query_subgraph(query).then((res) => {
            if (res.data.data.transactions.length == 0) {
                done = true;
                return;
            }

            // Join lists of txs, ignoring duplicates
            txs = txs.concat(res.data.data.transactions);
            prev_timestamp = res.data.data.transactions.slice(-1)[0].timestamp;
        })
        .catch((error) => {
            console.error(error);
            throw error;
        });
    }
    return txs;
}