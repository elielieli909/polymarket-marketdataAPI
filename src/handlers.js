// import Axios from "axios";
const Axios = require("axios");

const SUBGRAPH_URL = 'https://api.thegraph.com/subgraphs/name/tokenunion/polymarket-matic'

/**
 * Helper function for interacting with TheGraph via http POST
 * @param query - multiline string argument containing the gql query
 * @returns a Promise<JSON> containing the http response to the POST request
 */
async function query_subgraph(query) {
    return Axios.post(SUBGRAPH_URL, {
        query: query
    });
}

/**
 * Grab all the accounts on Polymarket (general info)
 * @returns a list of Accounts in order of id, where an Account holds basic metadata.  More detailed info (list of txs, pool memberships, etc. can be queried by id)
 */
async function allAccounts() {
    prev_last_id = '0';
    accounts = []
    done = false;
    // while (!done) {
    while (!done && accounts.length < 100) {    // for testing
        let query = `query {
            accounts(
                where: {id_gt: "${prev_last_id}"}
                first: 10
            ){
                id
                creationTimestamp
                lastSeenTimestamp
                scaledCollateralVolume
                numTrades
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
            console.log(error)
        });
    }
    return accounts;
}

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
async function allTradesForUser(userAddress) {
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
    txData = null;
    await query_subgraph(query).then((res) => {
        txData = res.data.data;
    }).catch((error) => {
        console.log(error);
    });
    return txData;
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
async function allFundingActionsForUser(userAddress) {
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
    fundingData = null;
    await query_subgraph(query).then((res) => {
        fundingData = res.data.data;
    }).catch((error) => {
        console.log(error);
    });
    return fundingData;
}

/**
 * Grabs all the pools the user is a member (LP) of, as well as how many LP tokens they own
 * @param userAddress - the matic wallet hash of the target user
 * @returns one list of fpmmPoolMemberships (poolID, amount)
 */
async function fpmmPoolMembershipsForUser(userAddress) {
    let query = `query {
        fpmmPoolMemberships(
            where: {funder: "${userAddress}"}
            first: 1000
        ){
            id
            amount
        }
    }`;
    memberships = [];
    await query_subgraph(query).then((res) => {
        // id gives pool address + funder address (0x...0x...) and we just want pool
        data = res.data.data.fpmmPoolMemberships;
        for (const poolMembership of data) {
            var newMembership = poolMembership;
            newMembership.id = poolMembership.id.slice(0,42);  // pool addr is 42 chars long
            memberships.push(poolMembership);
        }
    }).catch((error) => {
        console.log(error);
    });
    return memberships;
}

async function allPositionsOfUser(userAddress) {
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
    positions = [];
    await query_subgraph(query).then((res) => {
        positions = res.data.data.marketPositions;
    }).catch((error) => {
        console.log(error);
    });
    return positions;
}

async function allMarkets() {
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
    }`
    markets = [];
    await query_subgraph(query).then((res) => {
        markets = res.data.data.fixedProductMarketMakers;
    }).catch((error) => {
        console.log(error);
    });
    return markets;
}

module.exports = {
    allAccounts: allAccounts,
    allTradesForUser: allTradesForUser,
    allFundingActionsForUser: allFundingActionsForUser,
    fpmmPoolMembershipsForUser: fpmmPoolMembershipsForUser,
    allPositionsOfUser: allPositionsOfUser,
    allMarkets: allMarkets,


};