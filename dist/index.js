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
// const handlers = require('./handlers');
// import express from "express";
const handlers = __importStar(require("./handlers"));
const RPC_matic_1 = require("./RPC-matic");
// Start server
let app = express();
// GET routes
app.get("/allAccounts", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const accounts = yield handlers.allAccounts();
    res.json(accounts);
}));
app.get("/allTradesForUser", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.query.hash) {
        // TODO: send an error and tell client to give us a hash as a query param
        res.status(400);
        res.json("Error, need hash in query param");
        return;
    }
    const userHash = req.query.hash;
    const txs = yield handlers.allTradesForUser(userHash);
    res.json(txs);
}));
app.get("/allFundingActionsForUser", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.query.hash) {
        // TODO: send an error and tell client to give us a hash as a query param
        res.status(400);
        res.json("Error, need hash in query param");
        return;
    }
    const userHash = req.query.hash;
    const fundingActions = yield handlers.allFundingActionsForUser(userHash);
    res.json(fundingActions);
}));
app.get("/fpmmPoolMembershipsForUser", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.query.hash) {
        // TODO: send an error and tell client to give us a hash as a query param
        res.status(400);
        res.json("Error, need hash in query param");
        return;
    }
    const userHash = req.query.hash;
    const poolMemberships = yield handlers.fpmmPoolMembershipsForUser(userHash);
    res.json(poolMemberships);
}));
app.get("/allPositionsOfUser", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.query.hash) {
        // TODO: send an error and tell client to give us a hash as a query param
        res.status(400);
        res.json("Error, need hash in query param");
        return;
    }
    const userHash = req.query.hash;
    const positions = yield handlers.allPositionsOfUser(userHash);
    res.json(positions);
}));
app.get("/allMarkets", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const markets = yield handlers.allMarkets();
    res.json(markets);
}));
app.get("/pricesForMarket", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.query.hash) {
        // TODO: send an error and tell client to give us a hash as a query param
        res.status(400);
        res.json("Error, need hash in query param");
        return;
    }
    if (!req.query.startTime) {
        // TODO: send an error and tell client to give us a hash as a query param
        res.status(400);
        res.json("Error, need startTime in query param");
        return;
    }
    var endTime;
    if (!req.query.endTime) {
        // No specified end date, use now
        endTime = Math.floor(Date.now() / 1000);
    }
    else {
        endTime = Number(req.query.endTime);
    }
    var stepSize;
    if (!req.query.stepSize) {
        // default step size = 30 (Approx 1 min intervals)
        stepSize = 30;
    }
    else {
        stepSize = Number(req.query.stepSize);
    }
    const startBlock = yield RPC_matic_1.getBlockNumberAtTimestamp(Number(req.query.startTime));
    const endBlock = yield RPC_matic_1.getBlockNumberAtTimestamp(endTime);
    const prices = yield handlers.pricesForMarket(req.query.hash, startBlock, endBlock, stepSize);
    res.json(prices);
}));
app.get("/allTradesForMarket", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.query.hash) {
        res.status(400);
        res.json("Error, need hash in query param");
        return;
    }
    const txs = yield handlers.allTradesForMarket(req.query.hash);
    res.json(txs);
}));
app.listen(8080, () => {
    console.log("Server running on port 8080");
});
// main();
//# sourceMappingURL=index.js.map