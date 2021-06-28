A bunch of API's to get data from Polymarket on Matic.

Included endpoints:
** User Data **
1. allAccounts
    - Send all current accounts
2. allTradesForUser (userAddress)
    - Send a list of all the trades done by a given wallet address
    - TODO: allow configurable time range
3. allFundingActionsForUser (userAddress)
    - Send lists of all the funding additions/removals from a user
    - TODO: allow configurable time range
4. fpmmPoolMembershipsForUser (userAddress)
    - Get all the pool memberships of a user + how many LP token's of each pool
    - TODO: time range
5. allPositionsOfUser (userAddress)
    - Get a user's total positions
    - TODO: time range
6. Splits/Merges/Redemptions?

** Market Data **
7. allMarkets
    - Send all the markets ever, current or expired
    - TODO: choose only current or expired (query it's Conditions), configurable time range
8. pricesForMarket (marketAddress, startTime, endTime, stepSize)
    - Get a list of outcomeTokenPrices from startTime to endTime, skipping blocks over stepSize
9. allTradesForMarket(marketAddress, )
    - Get a list of all the trades on a market maker with marketAddress
9. historicalFundingDetails (marketAddress)
    - TODO: Send a list of all the LP interactions with this market, time range


TODO:
finish all endpoints
Add error handling
write docs