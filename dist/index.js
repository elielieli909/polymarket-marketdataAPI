"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const handlers = __importStar(require("./handlers"));
const RPC_matic_1 = require("./RPC-matic");
// Start server
let app = express();
app.get("/allAccounts", (res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const accounts = yield handlers.allAccounts();
        res.json(accounts);
    }
    catch (e) {
        res.status(500);
        res.send("There was an issue while grabbing all accounts.");
    }
}));
app.get("/allTradesForUser", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.query.hash) {
        res.status(400);
        res.json("Need to provide user hash as a query param");
        return;
    }
    const userHash = req.query.hash.toLowerCase();
    try {
        const txs = yield handlers.allTradesForUser(userHash);
        res.json(txs);
    }
    catch (e) {
        res.status(500);
        res.send("There was an error querying trades for this user.");
    }
}));
app.get("/allFundingActionsForUser", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.query.hash) {
        res.status(400);
        res.json("Need to provide user hash as a query param");
        return;
    }
    const userHash = req.query.hash.toLowerCase();
    try {
        const fundingActions = yield handlers.allFundingActionsForUser(userHash);
        res.json(fundingActions);
    }
    catch (e) {
        res.status(500);
        res.send("There was an issue querying for funding actions for this user.");
    }
}));
app.get("/fpmmPoolMembershipsForUser", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.query.hash) {
        res.status(400);
        res.json("Need to provide user hash as a query param");
        return;
    }
    const userHash = req.query.hash.toLowerCase();
    try {
        const poolMemberships = yield handlers.fpmmPoolMembershipsForUser(userHash);
        res.json(poolMemberships);
    }
    catch (e) {
        res.status(500);
        res.send("There was an issue grabbing this user's pool memberships.");
    }
}));
app.get("/allPositionsOfUser", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.query.hash) {
        res.status(400);
        res.json("Need to provide user hash as a query param");
        return;
    }
    const userHash = req.query.hash.toLowerCase();
    try {
        const positions = yield handlers.allPositionsOfUser(userHash);
        res.json(positions);
    }
    catch (e) {
        res.status(500);
        res.send("There was an issue querying positions for this user.");
    }
}));
app.get("/allMarkets", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const markets = yield handlers.allMarkets();
        res.json(markets);
    }
    catch (e) {
        res.status(500);
        res.send("There was an issue while querying for all markets.");
    }
}));
app.get("/pricesForMarket", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
    var endTime;
    var startBlock, endBlock = null;
    // If no specified end date, use now
    if (!req.query.endTime) {
        endTime = Math.floor(Date.now() / 1000);
    }
    else {
        endTime = Number(req.query.endTime);
    }
    // default step size = 30 (Approx 1 min intervals)
    var stepSize;
    if (!req.query.stepSize) {
        stepSize = 43200;
    }
    else {
        stepSize = Number(req.query.stepSize);
    }
    // Get block numbers of requested timestamps
    try {
        startBlock = yield RPC_matic_1.getBlockNumberAtTimestamp(Number(req.query.startTime));
        endBlock = yield RPC_matic_1.getBlockNumberAtTimestamp(endTime);
    }
    catch (e) {
        console.error(e);
        res.status(500);
        res.send("There was an issue getting the block number for the provided timestamp.  Please try again.");
        return;
    }
    try {
        const prices = yield handlers.pricesForMarket(req.query.hash.toLowerCase(), startBlock, endBlock, stepSize);
        res.json(prices);
    }
    catch (e) {
        res.status(500);
        res.send("Could not query prices for the selected market or timeframe.");
    }
}));
app.get("/pricesForMarketByBlock", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        endBlock = yield RPC_matic_1.getCurrentBlockNumber();
    }
    else {
        endBlock = Number(req.query.endBlock);
    }
    // default step size = 43200 (Approx 1 day intervals, assuming block time of ~2s)
    var stepSize;
    if (!req.query.stepSize) {
        stepSize = 43200;
    }
    else {
        stepSize = Number(req.query.stepSize);
    }
    try {
        const prices = yield handlers.pricesForMarket(req.query.hash.toLowerCase(), Number(req.query.startBlock), endBlock, stepSize);
        res.json(prices);
    }
    catch (e) {
        res.status(500);
        res.send("Could not query prices for the selected market or timeframe.");
    }
}));
app.get("/allTradesForMarket", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.query.hash) {
        res.status(400);
        res.json("Need to provide user hash as a query param");
        return;
    }
    try {
        const txs = yield handlers.allTradesForMarket(req.query.hash.toLowerCase());
        res.json(txs);
    }
    catch (e) {
        res.status(500);
        res.send("There was an issue querying trades for this market.");
    }
}));
app.listen(8080, () => {
    console.log("Server running on port 8080");
});
//# sourceMappingURL=index.js.map