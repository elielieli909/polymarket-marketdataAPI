# Polymarket Market Data API

A REST API to grab data from Polymarket on Matic.

## Included Endpoints (No Auth Required)
### User Data
* [allAccounts](docs/allAccounts.md) : `GET /allAccounts`
* [allTradesForUser](docs/allTradesForUser.md) : `GET /allTradesForUser?hash={userWalletAddress}`
* [allFundingActionsForUser](docs/allFundingActionsForUser.md) : `GET /allFundingActionsForUser?hash={userWalletAddress}`
* [fpmmPoolMembershipsForUser](docs/fpmmPoolMembershipsForUser.md) : `GET /fpmmPoolMembershipsForUser?hash={userWalletAddress}`
* [allPositionsOfUser](docs/allPositionsOfUser.md) : `GET /allPositionsOfUser?hash={userWalletAddress}`

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