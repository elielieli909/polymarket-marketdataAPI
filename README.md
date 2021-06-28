# Polymarket Market Data API

A REST API to grab data from Polymarket on Matic.

## Included Endpoints (No Auth Required)
### User Data
* [allAccounts](docs/allAccounts.md) : `GET /allAccounts`
* [allTradesForUser](allTradesForUser.md) : `GET /allTradesForUser?hash={userWalletAddress}`
    - Send a list of all the trades done by a given wallet address
    - TODO: allow configurable time range
* [allFundingActionsForUser](allFundingActionsForUser.md) : `GET /allFundingActionsForUser?hash={userWalletAddress}`
    - Send lists of all the funding additions/removals from a user
    - TODO: allow configurable time range
* [fpmmPoolMembershipsForUser](fpmmPoolMembershipsForUser.md) : `GET /fpmmPoolMembershipsForUser?hash={userWalletAddress}`
    - Get all the pool memberships of a user + how many LP token's of each pool
    - TODO: time range
* [allPositionsOfUser](allPositionsOfUser.md) : `GET /allPositionsOfUser?hash={userWalletAddress}`
    - Get a user's total positions
    - TODO: time range

### Market Data
* [allMarkets] : `GET /allMarkets`
    - Send all the markets ever, current or expired
    - TODO: choose only current or expired (query it's Conditions), configurable time range
* [pricesForMarket] (marketAddress, startTime, endTime, stepSize) : `GET /pricesForMarket?hash={fpmmContractAddress}&startTime={timestampToStartQuery}`
    - Optional query parameters:
        - endTime={timestampToEndQuery} -- defaults to now
        - stepSize={stepSize} -- number of blocks to skip between price lookups, defaults to 30 (keep in mind Polygon block times are ~2 seconds)
    - Get a list of outcomeTokenPrices from startTime to endTime, skipping blocks over stepSize
* [allTradesForMarket](marketAddress, ) : `GET /allTradesForMarket?hash={fpmmContractAddress}`
    - Get a list of all the trades on a market maker with marketAddress
* [historicalFundingDetails] (marketAddress)
    - TODO: Send a list of all the LP interactions with this market, time range


TODO:
finish all endpoints
Add error handling
write docs