"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.allTradesForMarket = exports.pricesForMarket = exports.allMarkets = exports.allPositionsOfUser = exports.fpmmPoolMembershipsForUser = exports.allFundingActionsForUser = exports.allTradesForUser = exports.allAccounts = void 0;
const axios_1 = __importDefault(require("axios"));
const SUBGRAPH_URL = 'https://api.thegraph.com/subgraphs/name/polymarket/polymarket-matic-trading';
/**
 * Helper function for interacting with TheGraph via http POST
 * @param query - multiline string argument containing the gql query
 * @returns a Promise<JSON> containing the http response to the POST request
 */
function query_subgraph(query) {
    return __awaiter(this, void 0, void 0, function* () {
        return axios_1.default.post(SUBGRAPH_URL, {
            query: query
        });
    });
}
/**
 * Grab all the accounts on Polymarket (general info)
 * @returns a list of Accounts in order of id, where an Account holds basic metadata.  More detailed info (list of txs, pool memberships, etc. can be queried by id)
 */
function allAccounts() {
    return __awaiter(this, void 0, void 0, function* () {
        var prev_last_id = '0';
        var accounts = [];
        var done = false;
        // while (!done) {
        while (!done && accounts.length < 100) { // for testing
            let query = `query {
            accounts(
                where: {id_gt: "${prev_last_id}"}
                first: 1000
            ){
                id
                creationTimestamp
                lastSeenTimestamp
                scaledCollateralVolume
                numTrades
                lastTradedTimestamp
            }
        }`;
            yield query_subgraph(query).then((res) => {
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
            });
        }
        return accounts;
    });
}
exports.allAccounts = allAccounts;
/**
 * Grab all the transactions (trades) for a given user **NOTE** ASSUMES USER HAS DONE LESS THAN 1000 OF EACH
 * TODO: FIX THAT                                                   ^
 * ALSO, TRADEAMOUNT ISN'T A FLOAT.
 * TODO: FIGURE OUT IF SHOULD KEEP AS IS OR TURN INTO USD VALUE INSTEAD OF USDC
 * TODO: Sort by timestamp (order_by isn't working for some reason)
 * TODO: nothing shows up for market???
 * @param userAddress - the matic wallet hash of the target user
 * @returns a list of transactions (txid, type(B or S), marketID, tradeAmount, feesPaid, whatOutcome, howManyOutcomeTokens, timestamp)
 */
function allTradesForUser(userAddress) {
    return __awaiter(this, void 0, void 0, function* () {
        let query = `query {
        transactions(
            where: {user: "${userAddress}"}
            first: 1000
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
        var txData = null;
        yield query_subgraph(query).then((res) => {
            txData = res.data.data;
        }).catch((error) => {
            console.log(error);
        });
        return txData;
    });
}
exports.allTradesForUser = allTradesForUser;
/**
 * Grab all the funding actions (removals/additions) a user has done across all markets **NOTE** ASSUMES USER HAS DONE LESS THAN 1000 OF EACH
 * TODO: FIX THAT                                                                                          ^
 * TODO: Sort by timestamp (order_by isn't working for some reason)
 * TODO: nothing shows up for fpmm???
 * TODO: figure out what the amountsAdded, amountsRefunded, and amountsRemoved mean
 * @param userAddress - the matic wallet hash of the target user
 * @returns one list of fpmmFundingAddition(s) and another of fpmmFundingRemoval(s)
 */
function allFundingActionsForUser(userAddress) {
    return __awaiter(this, void 0, void 0, function* () {
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
        yield query_subgraph(query).then((res) => {
            fundingData = res.data.data;
        }).catch((error) => {
            console.log(error);
        });
        return fundingData;
    });
}
exports.allFundingActionsForUser = allFundingActionsForUser;
/**
 * Grabs all the pools the user is a member (LP) of, as well as how many LP tokens they own
 * @param userAddress - the matic wallet hash of the target user
 * @returns one list of fpmmPoolMemberships (poolID, amount)
 */
function fpmmPoolMembershipsForUser(userAddress) {
    return __awaiter(this, void 0, void 0, function* () {
        let query = `query {
        fpmmPoolMemberships(
            where: {funder: "${userAddress}"}
            first: 1000
        ){
            id
            amount
        }
    }`;
        var memberships = [];
        yield query_subgraph(query).then((res) => {
            // id gives pool address + funder address (0x...0x...) and we just want pool
            const data = res.data.data.fpmmPoolMemberships;
            for (const poolMembership of data) {
                var newMembership = poolMembership;
                newMembership.id = poolMembership.id.slice(0, 42); // pool addr is 42 chars long
                memberships.push(poolMembership);
            }
        }).catch((error) => {
            console.log(error);
        });
        return memberships;
    });
}
exports.fpmmPoolMembershipsForUser = fpmmPoolMembershipsForUser;
function allPositionsOfUser(userAddress) {
    return __awaiter(this, void 0, void 0, function* () {
        let query = `query {
        marketPositions(
                where: {user: "${userAddress}"}
        ){
            id
            market {
                id
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
        var positions = [];
        yield query_subgraph(query).then((res) => {
            positions = res.data.data.marketPositions;
        }).catch((error) => {
            console.log(error);
        });
        return positions;
    });
}
exports.allPositionsOfUser = allPositionsOfUser;
function allMarkets() {
    return __awaiter(this, void 0, void 0, function* () {
        let query = `query {
        fixedProductMarketMakers (
            first:1000
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
        var markets = [];
        yield query_subgraph(query).then((res) => {
            markets = res.data.data.fixedProductMarketMakers;
        }).catch((error) => {
            console.log(error);
        });
        return markets;
    });
}
exports.allMarkets = allMarkets;
function pricesForMarket(marketAddress, startBlock, endBlock, stepSize) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!stepSize) {
            stepSize = 30;
        }
        let prices = [];
        for (var i = startBlock; i <= endBlock; i += stepSize) {
            let query = `{
            fixedProductMarketMaker(id: "${marketAddress}", block: {number: ${i}}) {
                        outcomeTokenPrices
                    }
                }`;
            yield query_subgraph(query).then((res) => {
                const priceStruct = {
                    block: i,
                    prices: res.data.data.fixedProductMarketMaker.outcomeTokenPrices
                };
                prices.push(priceStruct);
            });
        }
        return prices;
    });
}
exports.pricesForMarket = pricesForMarket;
function allTradesForMarket(marketAddress) {
    return __awaiter(this, void 0, void 0, function* () {
        let done = false;
        let txs = [];
        let prev_timestamp = "0";
        while (!done) {
            let query = `query {
            transactions(
                where: {
                    market: "${marketAddress}"
                    timestamp_gt: ${prev_timestamp}
                }
                first:10
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
            yield query_subgraph(query).then((res) => {
                if (res.data.data.transactions.length == 0) {
                    done = true;
                    return;
                }
                // Join lists of txs, ignoring duplicates
                txs = txs.concat(res.data.data.transactions);
                prev_timestamp = res.data.data.transactions.slice(-1)[0].timestamp;
                console.log(prev_timestamp);
            })
                .catch((error) => {
                console.log(error);
            });
        }
        return txs;
    });
}
exports.allTradesForMarket = allTradesForMarket;
//# sourceMappingURL=handlers.js.map