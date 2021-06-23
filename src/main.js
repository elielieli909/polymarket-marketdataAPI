const express = require('express');
const handlers = require('./handlers');
// console.log(handlers.getAllAccounts());

// async function main() {
//     // Get all accounts
//     // accounts = await(handlers.allAccounts());
//     // console.log(accounts);

//     txs = await(handlers.allTransactionsForUser('0x0362a00720c90f5589f58e88abd6e602fa05ea76'));

// }

// Start server
let app = express();

// GET routes
app.get("/allAccounts", async (req, res, next) => {
    accounts = await handlers.allAccounts();
    res.json(accounts);
});

app.get("/allTradesForUser", async (req, res, next) => {
    if (!req.query.hash) {
        // TODO: send an error and tell client to give us a hash as a query param
        res.json("Error, need hash in query param");
    }
    let userHash = req.query.hash;
    txs = await handlers.allTradesForUser(userHash);
    res.json(txs);
});

app.get("/allFundingActionsForUser", async (req, res, next) => {
    if (!req.query.hash) {
        // TODO: send an error and tell client to give us a hash as a query param
        res.json("Error, need hash in query param");
    }
    let userHash = req.query.hash;
    fundingActions = await handlers.allFundingActionsForUser(userHash);
    res.json(fundingActions);
});

app.get("/fpmmPoolMembershipsForUser", async (req, res, next) => {
    if (!req.query.hash) {
        // TODO: send an error and tell client to give us a hash as a query param
        res.json("Error, need hash in query param");
    }
    let userHash = req.query.hash;
    poolMemberships = await handlers.fpmmPoolMembershipsForUser(userHash);
    res.json(poolMemberships);
});

app.get("/allPositionsOfUser", async (req, res, next) => {
    if (!req.query.hash) {
        // TODO: send an error and tell client to give us a hash as a query param
        res.json("Error, need hash in query param");
    }
    let userHash = req.query.hash;
    positions = await handlers.allPositionsOfUser(userHash);
    res.json(positions);
});

app.listen(8080, () => {
    console.log("Server running on port 8080");
});

// main();