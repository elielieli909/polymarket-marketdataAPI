import Web3 from "web3";
const MATIC_RPC = 'https://rpc-mumbai.matic.today';

/**
 * Gets a block number on the matic chain at a given timestamp 
 * @param timestamp in seconds; the timestamp for which we want the corresponding block #
 * @returns the corresponding block number
 */
export async function getBlockNumberAtTimestamp(timestamp: number): Promise<number> {
    var web3 = new Web3(MATIC_RPC);
    let cur_blocknum = await web3.eth.getBlockNumber();
    let cur_block = await retryGetBlockUntilSuccess(cur_blocknum, 1000);
    if (!cur_block) {
        throw new Error(`Couldnt get block details from RPC for block number: ${cur_blocknum}`);
    }

    const matic_blocktime = 2 //second; approx
    const now = Math.floor(Date.now() / 1000);

    // Converge on the correct block, taking smaller steps the closer we get
    var prev_blocknum = cur_blocknum;
    while( cur_block.timestamp != timestamp) {
        if (cur_block.timestamp > timestamp) {
            console.log(`change: ${((Number(cur_block.timestamp) - timestamp) / matic_blocktime) * -1}`);
            cur_blocknum = cur_blocknum - Math.floor((Number(cur_block.timestamp) - timestamp) / matic_blocktime);
        } else if (cur_block.timestamp < timestamp) {
            console.log(`change: ${(timestamp - Number(cur_block.timestamp)) / matic_blocktime}`);
            cur_blocknum = cur_blocknum + Math.floor((timestamp - Number(cur_block.timestamp)) / matic_blocktime);
        }
        cur_block = await retryGetBlockUntilSuccess(cur_blocknum, 1000);
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
}

/**
 * Gets the current block number.
 * @returns the current block number
 */
export async function getCurrentBlockNumber(): Promise<number> {
    const web3 = new Web3(MATIC_RPC);
    let cur_blocknum = await web3.eth.getBlockNumber();
    return cur_blocknum;
}

export async function getTimestampFromBlocknumber(blocknum: number): Promise<number | string> {
    const web3 = new Web3(MATIC_RPC);
    let block = await retryGetBlockUntilSuccess(blocknum, 1000);
    if (!block) {
        throw new Error(`Couldnt get block details from RPC for block number: ${blocknum}`);
    }
    return block.timestamp;
}

/**
 * Helper function wrapping the web3.eth.getBlock(blockNumber) function, in case of a 404 (happens sporadically)
 * @param blockNumber The block number we want to get the block details of
 * @param repeatLimit The max number of retries we want
 * @returns the BlockTransactionString returned by web3.eth.getBlock()
 */
async function retryGetBlockUntilSuccess(blockNumber: number, repeatLimit?: number) {
    var web3 = new Web3(MATIC_RPC);
    let block = null;
    while (!block && repeatLimit > 0) {
        try {
            block = await web3.eth.getBlock(blockNumber);
        } catch {
            console.log('Error fetching block');
        }
    }
    return block;
}

async function recurse(blockNumber: number, repeatLimit:number) {
    if (repeatLimit == 0) {
        return null;
    }
    try {
        const web3 = new Web3(MATIC_RPC);
        let cur_block = await web3.eth.getBlock(blockNumber);
        return cur_block;
    } catch {
        recurse(blockNumber, repeatLimit - 1);
    }
}
