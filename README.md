# Polymarket Market Data API

A REST API to grab data from Polymarket on Matic.

## Included Endpoints
No auth required.
### User Data
* [allAccounts](docs/allAccounts.md) : `GET /allAccounts`
* [allTradesForUser](docs/allTradesForUser.md) : `GET /allTradesForUser?hash={userWalletAddress}`
* [allFundingActionsForUser](docs/allFundingActionsForUser.md) : `GET /allFundingActionsForUser?hash={userWalletAddress}`
* [fpmmPoolMembershipsForUser](docs/fpmmPoolMembershipsForUser.md) : `GET /fpmmPoolMembershipsForUser?hash={userWalletAddress}`
* [allPositionsOfUser](docs/allPositionsOfUser.md) : `GET /allPositionsOfUser?hash={userWalletAddress}`

### Market Data
* [allMarkets](docs/allMarkets.md) : `GET /allMarkets`
* [pricesForMarket](docs/pricesForMarket.md) : `GET /pricesForMarket?hash={fpmmContractAddress}&startTime={timestampToStartQuery}`
* [pricesForMarketByBlock](docs/pricesForMarketByBlock.md) : `GET /pricesForMarketByBlock?hash={fpmmContractAddress}&startBlock={timestampToStartQuery}`
* [allTradesForMarket](docs/allTradesForMarket.md) : `GET /allTradesForMarket?hash={fpmmContractAddress}`
    - Get a list of all the trades on a market maker with marketAddress
* [historicalFundingDetails] (marketAddress)
    - TODO: Send a list of all the LP interactions with this market, time range


TODO:
finish all endpoints
Add error handling
write docs