const express = require('express');
import * as handlers from "./handlers";
import {getBlockNumberAtTimestamp, getCurrentBlockNumber} from "./RPC-matic";

// Start server
let app = express();

app.get("/allAccounts", async (res: any) => {
    try {
        const accounts = await handlers.allAccounts();
        res.json(accounts);
    } catch (e) {
        res.status(500)
        res.send("There was an issue while grabbing all accounts.")
    }
});

app.get("/allTradesForUser", async (req: any, res: any) => {
    if (!req.query.hash) {
        res.status(400);
        res.json("Need to provide user hash as a query param");
        return;
    }
    const userHash = req.query.hash.toLowerCase();
    try {
        const txs = await handlers.allTradesForUser(userHash);
        res.json(txs);
    } catch (e) {
        res.status(500);
        res.send("There was an error querying trades for this user.");
    }
});

app.get("/allFundingActionsForUser", async (req: any, res: any) => {
    if (!req.query.hash) {
        res.status(400);
        res.json("Need to provide user hash as a query param");
        return;
    }
    const userHash = req.query.hash.toLowerCase();
    try {
        const fundingActions = await handlers.allFundingActionsForUser(userHash);
        res.json(fundingActions);
    } catch (e) {
        res.status(500);
        res.send("There was an issue querying for funding actions for this user.")
    }
});

app.get("/fpmmPoolMembershipsForUser", async (req: any, res: any) => {
    if (!req.query.hash) {
        res.status(400);
        res.json("Need to provide user hash as a query param");
        return;
    }
    const userHash = req.query.hash.toLowerCase();
    try {
        const poolMemberships = await handlers.fpmmPoolMembershipsForUser(userHash);
        res.json(poolMemberships);
    } catch (e) {
        res.status(500);
        res.send("There was an issue grabbing this user's pool memberships.");
    }
    
});

app.get("/allPositionsOfUser", async (req: any, res: any) => {
    if (!req.query.hash) {
        res.status(400);
        res.json("Need to provide user hash as a query param");
        return;
    }
    const userHash = req.query.hash.toLowerCase();
    try {
        const positions = await handlers.allPositionsOfUser(userHash);
        res.json(positions);
    } catch (e) {
        res.status(500);
        res.send("There was an issue querying positions for this user.");
    }
});

app.get("/allMarkets", async (req: any, res: any) => {
    try {
        const markets = await handlers.allMarkets();
        res.json(markets);
    } catch (e) {
        res.status(500);
        res.send("There was an issue while querying for all markets.");
    }
});

app.get("/pricesForMarket", async (req: any, res: any) => {
    if (!req.query.hash) {
        res.status(400);
        res.json("Need to provide user hash as a query param");
        return;
    }
    if (!req.query.startTime) {
        res.status(400);
        res.json("Need to provide a timestamp under a startTime query parameter");
        return;
    }

    var endTime: number;
    var startBlock, endBlock = null;

    // If no specified end date, use now
    if (!req.query.endTime) {
        endTime = Math.floor(Date.now() / 1000);
    } else {
        endTime = Number(req.query.endTime);
    }

    // default step size = 30 (Approx 1 min intervals)
    var stepSize: number;
    if (!req.query.stepSize) {
        stepSize = 43200;
    } else {
        stepSize = Number(req.query.stepSize);
    }

    // Get block numbers of requested timestamps
    try {
        startBlock = await getBlockNumberAtTimestamp(Number(req.query.startTime));
        endBlock = await getBlockNumberAtTimestamp(endTime);
    } catch (e) {
        console.error(e);
        res.status(500);
        res.send("There was an issue getting the block number for the provided timestamp.  Please try again.");
        return;
    }

    try {
        const prices = await handlers.pricesForMarket(req.query.hash.toLowerCase(), startBlock, endBlock, stepSize);
        res.json(prices);
    } catch (e) {
        res.status(500);
        res.send("Could not query prices for the selected market or timeframe.");
    }
});

app.get("/pricesForMarketByBlock", async (req:any, res:any) => {
    if (!req.query.hash) {
        res.status(400);
        res.json("Need to provide user hash as a query param");
        return;
    }
    if (!req.query.startBlock) {
        res.status(400);
        res.json("Need to provide a block number under a startBlock query parameter");
        return;
    }

    // No specified end block, use now
    var endBlock = null;
    if (!req.query.endBlock) {
        endBlock = await getCurrentBlockNumber();
    } else {
        endBlock = Number(req.query.endBlock);
    }

    // default step size = 43200 (Approx 1 day intervals, assuming block time of ~2s)
    var stepSize: number;
    if (!req.query.stepSize) {
        stepSize = 43200;
    } else {
        stepSize = Number(req.query.stepSize);
    }

    try {
        const prices = await handlers.pricesForMarket(req.query.hash.toLowerCase(), Number(req.query.startBlock), endBlock, stepSize);
        res.json(prices);
    } catch (e) {
        res.status(500);
        res.send("Could not query prices for the selected market or timeframe.");
    }
});

app.get("/allTradesForMarket", async (req:any, res:any) => {
    if (!req.query.hash) {
        res.status(400);
        res.json("Need to provide user hash as a query param");
        return;
    }
    try {
        const txs = await handlers.allTradesForMarket(req.query.hash.toLowerCase());
        res.json(txs);
    } catch (e) {
        res.status(500);
        res.send("There was an issue querying trades for this market.");
    }
})

app.listen(8080, () => {
    console.log("Server running on port 8080");
});