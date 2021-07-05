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
exports.getTimestampFromBlocknumber = exports.getCurrentBlockNumber = exports.getBlockNumberAtTimestamp = void 0;
const web3_1 = __importDefault(require("web3"));
const MATIC_RPC = 'https://rpc-mumbai.matic.today';
/**
 * Gets a block number on the matic chain at a given timestamp
 * @param timestamp in seconds; the timestamp for which we want the corresponding block #
 * @returns the corresponding block number
 */
function getBlockNumberAtTimestamp(timestamp) {
    return __awaiter(this, void 0, void 0, function* () {
        var web3 = new web3_1.default(MATIC_RPC);
        let cur_blocknum = yield web3.eth.getBlockNumber();
        let cur_block = yield retryGetBlockUntilSuccess(cur_blocknum, 1000);
        if (!cur_block) {
            throw new Error(`Couldnt get block details from RPC for block number: ${cur_blocknum}`);
        }
        const matic_blocktime = 2; //second; approx
        // Converge on the correct block, taking smaller steps the closer we get
        var prev_blocknum = cur_blocknum;
        const startTime = Date.now(); // Sometimes blocknum bounces instead of converging; cap at 10 seconds
        while (cur_block.timestamp != timestamp && Date.now() < startTime + 10000) {
            if (cur_block.timestamp > timestamp) {
                console.log(`change: ${((Number(cur_block.timestamp) - timestamp) / matic_blocktime) * -1}`);
                cur_blocknum = cur_blocknum - Math.floor((Number(cur_block.timestamp) - timestamp) / matic_blocktime);
            }
            else if (cur_block.timestamp < timestamp) {
                console.log(`change: ${(timestamp - Number(cur_block.timestamp)) / matic_blocktime}`);
                cur_blocknum = cur_blocknum + Math.floor((timestamp - Number(cur_block.timestamp)) / matic_blocktime);
            }
            cur_block = yield retryGetBlockUntilSuccess(cur_blocknum, 1000);
            // console.log(cur_block);
            if (!cur_block) {
                throw new Error(`Couldnt get block details from RPC for block number: ${cur_blocknum}`);
            }
            if (prev_blocknum == cur_blocknum) {
                break;
            }
            prev_blocknum = cur_blocknum;
        }
        return cur_blocknum;
    });
}
exports.getBlockNumberAtTimestamp = getBlockNumberAtTimestamp;
/**
 * Gets the current block number.
 * @returns the current block number
 */
function getCurrentBlockNumber() {
    return __awaiter(this, void 0, void 0, function* () {
        const web3 = new web3_1.default(MATIC_RPC);
        let cur_blocknum = yield web3.eth.getBlockNumber();
        return cur_blocknum;
    });
}
exports.getCurrentBlockNumber = getCurrentBlockNumber;
function getTimestampFromBlocknumber(blocknum) {
    return __awaiter(this, void 0, void 0, function* () {
        const web3 = new web3_1.default(MATIC_RPC);
        let block = yield retryGetBlockUntilSuccess(blocknum, 1000);
        if (!block) {
            throw new Error(`Couldnt get block details from RPC for block number: ${blocknum}`);
        }
        return block.timestamp;
    });
}
exports.getTimestampFromBlocknumber = getTimestampFromBlocknumber;
/**
 * Helper function wrapping the web3.eth.getBlock(blockNumber) function, in case of a 404 (happens sporadically)
 * @param blockNumber The block number we want to get the block details of
 * @param repeatLimit The max number of retries we want
 * @returns the BlockTransactionString returned by web3.eth.getBlock()
 */
function retryGetBlockUntilSuccess(blockNumber, repeatLimit) {
    return __awaiter(this, void 0, void 0, function* () {
        var web3 = new web3_1.default(MATIC_RPC);
        let block = null;
        while (!block && repeatLimit > 0) {
            try {
                block = yield web3.eth.getBlock(blockNumber);
            }
            catch (_a) {
                console.log('Error fetching block');
            }
        }
        return block;
    });
}
function recurse(blockNumber, repeatLimit) {
    return __awaiter(this, void 0, void 0, function* () {
        if (repeatLimit == 0) {
            return null;
        }
        try {
            const web3 = new web3_1.default(MATIC_RPC);
            let cur_block = yield web3.eth.getBlock(blockNumber);
            return cur_block;
        }
        catch (_a) {
            recurse(blockNumber, repeatLimit - 1);
        }
    });
}
//# sourceMappingURL=RPC-matic.js.map