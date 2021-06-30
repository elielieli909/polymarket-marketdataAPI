## Account
### id
* User address
### creationTimestamp
* Timestamp at which account first interacted with Polymarket
### lastSeenTimestamp
* Timestamp at which account most recently interacted with Polymarket
### collateralVolume
* Total volume of this user's trades in USDC base units
### numTrades
* Total number of trades performed by this user
### scaledCollateralVolume
* Total volume of this user's trades in USDC scaled by 10^6
### lastTradedTimestamp
* Timestamp of last Buy or Sell transaction
### fpmmPoolMemberships
* Markets in which user has provided liquidity
### marketPositions
* Markets in which the user has taken a position on the outcome
### transactions
* Purchases and sales of shares by the user
### splits
* Split of collateral / outcome tokens into multiple positions
### merges
* Merge of more specific outcome tokens into collateral / more general outcome tokens
### redemptions
* Redemption of underlying collateral after a market has resolved
## Collateral
### id
* Token address
### name
### symbol
### decimals
## Condition
### id
### oracle
* Address which can resolve this condition
### questionId
* Question ID which corresponds to this condition
### outcomeSlotCount
* Number of possible outcomes for this condition
### resolutionTimestamp
* Timestamp at which this condition was resolved
### payouts
* Fraction of collateral assigned to each outcome
### payoutNumerators
### payoutDenominator
### fixedProductMarketMakers
* Market makers which are trading on this condition
## FixedProductMarketMaker
### id
* Market maker address
### creator
* Address which deployed this market
### creationTimestamp
* Time at which this market was deployed
### creationTransactionHash
* Hash of deployment transactions
### collateralToken
* Token which is colleralising this market
### conditions
* Conditions which this market is trading against
### fee
* Percentage fee of trades taken by market maker. A 2% fee is represented as 2*10^16
### tradesQuantity
* Number of trades of any kind against this market maker
### buysQuantity
* Number of purchases of shares from this market maker
### sellsQuantity
* Number of sales of shares to this market maker
### liquidityAddQuantity
* Number of times liquidity has been added to this market maker
### liquidityRemoveQuantity
* Number of times liquidity has been removed from this market maker
### collateralVolume
* Market volume in terms of the underlying collateral value
### scaledCollateralVolume
* Volume scaled by the number of decimals of collateralToken
### collateralBuyVolume
* Global volume of share purchases in USDC base units
### scaledCollateralBuyVolume
* Global volume of share purchases in USDC scaled by 10^6
### collateralSellVolume
* Global volume of share sales in USDC base units
### scaledCollateralSellVolume
* Global volume of share sales in USDC scaled by 10^6
### feeVolume
* Fees collected in terms of the underlying collateral value
### scaledFeeVolume
* Fees scaled by the number of decimals of collateralToken
### liquidityParameter
* Constant product parameter k
### scaledLiquidityParameter
### outcomeTokenAmounts
* Balances of each outcome token held by the market maker
### outcomeTokenPrices
* Prices at which market maker values each outcome token
### outcomeSlotCount
* Number of outcomes which this market maker is trading
### lastActiveDay
* Timestamp of last day during which someone made a trade
### totalSupply
* Number of shares for tokens in the market maker's reserves
### poolMembers
* Addresses which are supplying liquidity to the market maker
## FpmmFundingAddition
### id
* Transaction Hash
### timestamp
* Timestamp at which funding addition occurred
### fpmm
* FPMM to which funding is being added
### funder
* Account adding funding
### amountsAdded
* Outcome tokens amounts added to FPMM
### amountsRefunded
* Outcome tokens amounts refunded to funder
### sharesMinted
* Liquidity shares minted to funder
## FpmmFundingRemoval
### id
* Transaction Hash
### timestamp
* Timestamp at which funding removal occurred
### fpmm
* FPMM to which funding is being removed
### funder
* Account removing funding
### amountsRemoved
* Outcome tokens amounts removed from FPMM
### collateralRemoved
### sharesBurnt
* Liquidity shares burned by funder
## FpmmPoolMembership
### id
* funder address + pool address
### pool
* Market to which funder is providing funding
### funder
* Account which is providing funding
### amount
* Amount of liquidity tokens owned by funder
## Global
### id
* ID is empty string, this is a singleton
### numConditions
### numOpenConditions
### numClosedConditions
### numTraders
* Number of unique traders interacting with Polymarket
### tradesQuantity
* Number of trades of any kind for all market makers
### buysQuantity
* Number of purchases of shares from any market maker
### sellsQuantity
* Number of sales of shares to any market maker
### collateralVolume
* Global volume in USDC base units
### scaledCollateralVolume
* Global volume in USDC scaled by 10^6
### collateralFees
* Global fees in USDC base units
### scaledCollateralFees
* Global fees in USDC scaled by 10^6
### collateralBuyVolume
* Global volume of share purchases in USDC base units
### scaledCollateralBuyVolume
* Global volume of share purchases in USDC scaled by 10^6
### collateralSellVolume
* Global volume of share sales in USDC base units
### scaledCollateralSellVolume
* Global volume of share sales in USDC scaled by 10^6
## MarketPosition
### id
* concatenated userID + marketID
### market
* Market on which this position is on
### user
* Address which holds this position
### outcomeIndex
* The outcome which this position is supporting
### quantityBought
* Number of outcome shares that the user has ever bought
### quantitySold
* Number of outcome shares that the user has ever sold
### netQuantity
* Number of outcome shares that the user current has
### valueBought
* Total value of outcome shares that the user has bought
### valueSold
* Total value of outcome shares that the user has sold
### netValue
* Total value paid by the user to enter this position
### feesPaid
* Total amount of fees paid by user in relation to this position
## Transaction
### id
* Transaction Hash
### type
* Buy or Sell transaction
### timestamp
* Timestamp at which transaction occurred
### market
* Market which transaction is interacting with
### user
* Account performing transaction
### tradeAmount
* Amount of collateral in trade
### feeAmount
* Amount of collateral paid in fees
### outcomeIndex
* Index of outcome token being bought or sold
### outcomeTokensAmount
* Amount of outcome tokens being bought or sold
