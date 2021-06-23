{
    "data": {
        "__schema": {
            "types": [
                {
                    "name": "Account"
                    "fields": [
                        {
                            "description": "User address",
                            "name": "id",
                            "type": {
                                "kind": "NON_NULL",
                                "name": null,
                                "ofType": {
                                    "kind": "SCALAR",
                                    "name": "ID"
                                }
                            }
                        },
                        {
                            "description": "Timestamp at which account first interacted with Polymarket",
                            "name": "creationTimestamp",
                            "type": {
                                "kind": "NON_NULL",
                                "name": null,
                                "ofType": {
                                    "kind": "SCALAR",
                                    "name": "BigInt"
                                }
                            }
                        },
                        {
                            "description": "Timestamp at which account most recently interacted with Polymarket",
                            "name": "lastSeenTimestamp",
                            "type": {
                                "kind": "NON_NULL",
                                "name": null,
                                "ofType": {
                                    "kind": "SCALAR",
                                    "name": "BigInt"
                                }
                            }
                        },
                        {
                            "description": "Total volume of this user's trades in USDC base units",
                            "name": "collateralVolume",
                            "type": {
                                "kind": "NON_NULL",
                                "name": null,
                                "ofType": {
                                    "kind": "SCALAR",
                                    "name": "BigInt"
                                }
                            }
                        },
                        {
                            "description": "Total number of trades performed by this user",
                            "name": "numTrades",
                            "type": {
                                "kind": "NON_NULL",
                                "name": null,
                                "ofType": {
                                    "kind": "SCALAR",
                                    "name": "BigInt"
                                }
                            }
                        },
                        {
                            "description": "Total volume of this user's trades in USDC scaled by 10^6",
                            "name": "scaledCollateralVolume",
                            "type": {
                                "kind": "NON_NULL",
                                "name": null,
                                "ofType": {
                                    "kind": "SCALAR",
                                    "name": "BigDecimal"
                                }
                            }
                        },
                        {
                            "description": "Timestamp of last Buy or Sell transaction",
                            "name": "lastTradedTimestamp",
                            "type": {
                                "kind": "NON_NULL",
                                "name": null,
                                "ofType": {
                                    "kind": "SCALAR",
                                    "name": "BigInt"
                                }
                            }
                        },
                        {
                            "description": "Markets in which user has provided liquidity",
                            "name": "fpmmPoolMemberships", ** THIS COMES UP EMPTY WHEN QUERYING. IDK WHY **
                            "type": {
                                "kind": "LIST",
                                "name": null,
                                "ofType": {
                                    "kind": "NON_NULL",
                                    "name": null
                                }
                            }
                        },
                        {
                            "description": "Markets in which the user has taken a position on the outcome",
                            "name": "marketPositions", ** THIS COMES UP EMPTY WHEN QUERYING. IDK WHY **
                            "type": {
                                "kind": "LIST",
                                "name": null,
                                "ofType": {
                                    "kind": "NON_NULL",
                                    "name": null
                                }
                            }
                        },
                        {
                            "description": "Purchases and sales of shares by the user",
                            "name": "transactions",
                            "type": {
                                "kind": "LIST",
                                "name": null,
                                "ofType": {
                                    "kind": "NON_NULL",
                                    "name": null
                                }
                            }
                        },
                        {
                            "description": "Split of collateral / outcome tokens into multiple positions",
                            "name": "splits",
                            "type": {
                                "kind": "LIST",
                                "name": null,
                                "ofType": {
                                    "kind": "NON_NULL",
                                    "name": null
                                }
                            }
                        },
                        {
                            "description": "Merge of more specific outcome tokens into collateral / more general outcome tokens",
                            "name": "merges",
                            "type": {
                                "kind": "LIST",
                                "name": null,
                                "ofType": {
                                    "kind": "NON_NULL",
                                    "name": null
                                }
                            }
                        },
                        {
                            "description": "Redemption of underlying collateral after a market has resolved",
                            "name": "redemptions",
                            "type": {
                                "kind": "LIST",
                                "name": null,
                                "ofType": {
                                    "kind": "NON_NULL",
                                    "name": null
                                }
                            }
                        }
                    ]
                },
                {
                    "name": "Account_filter"
                },
                {
                    "name": "Account_orderBy"
                },
                {
                    "name": "BigDecimal"
                },
                {
                    "name": "BigInt"
                },
                {
                    "name": "Block_height"
                },
                {
                    "name": "Boolean"
                },
                {
                    "name": "Bytes"
                },
                {
                    "name": "Collateral"
                    "fields": [
                        {
                            "description": "Token address",
                            "name": "id",
                            "type": {
                                "kind": "NON_NULL",
                                "name": null,
                                "ofType": {
                                    "kind": "SCALAR",
                                    "name": "ID"
                                }
                            }
                        },
                        {
                            "description": null,
                            "name": "name",
                            "type": {
                                "kind": "NON_NULL",
                                "name": null,
                                "ofType": {
                                    "kind": "SCALAR",
                                    "name": "String"
                                }
                            }
                        },
                        {
                            "description": null,
                            "name": "symbol",
                            "type": {
                                "kind": "NON_NULL",
                                "name": null,
                                "ofType": {
                                    "kind": "SCALAR",
                                    "name": "String"
                                }
                            }
                        },
                        {
                            "description": null,
                            "name": "decimals",
                            "type": {
                                "kind": "NON_NULL",
                                "name": null,
                                "ofType": {
                                    "kind": "SCALAR",
                                    "name": "Int"
                                }
                            }
                        }
                    ]
                },
                {
                    "name": "Collateral_filter"
                },
                {
                    "name": "Collateral_orderBy"
                },
                {
                    "name": "Condition"
                    "fields": [
                        {
                            "description": null,
                            "name": "id",
                            "type": {
                                "kind": "NON_NULL",
                                "name": null,
                                "ofType": {
                                    "kind": "SCALAR",
                                    "name": "ID"
                                }
                            }
                        },
                        {
                            "description": "Address which can resolve this condition",
                            "name": "oracle",
                            "type": {
                                "kind": "NON_NULL",
                                "name": null,
                                "ofType": {
                                    "kind": "SCALAR",
                                    "name": "Bytes"
                                }
                            }
                        },
                        {
                            "description": "Question ID which corresponds to this condition",
                            "name": "questionId",
                            "type": {
                                "kind": "NON_NULL",
                                "name": null,
                                "ofType": {
                                    "kind": "SCALAR",
                                    "name": "Bytes"
                                }
                            }
                        },
                        {
                            "description": "Number of possible outcomes for this condition",
                            "name": "outcomeSlotCount",
                            "type": {
                                "kind": "NON_NULL",
                                "name": null,
                                "ofType": {
                                    "kind": "SCALAR",
                                    "name": "Int"
                                }
                            }
                        },
                        {
                            "description": "Timestamp at which this condition was resolved",
                            "name": "resolutionTimestamp",
                            "type": {
                                "kind": "SCALAR",
                                "name": "BigInt",
                                "ofType": null
                            }
                        },
                        {
                            "description": "Fraction of collateral assigned to each outcome",
                            "name": "payouts",
                            "type": {
                                "kind": "LIST",
                                "name": null,
                                "ofType": {
                                    "kind": "NON_NULL",
                                    "name": null
                                }
                            }
                        },
                        {
                            "description": null,
                            "name": "payoutNumerators",
                            "type": {
                                "kind": "LIST",
                                "name": null,
                                "ofType": {
                                    "kind": "NON_NULL",
                                    "name": null
                                }
                            }
                        },
                        {
                            "description": null,
                            "name": "payoutDenominator",
                            "type": {
                                "kind": "SCALAR",
                                "name": "BigInt",
                                "ofType": null
                            }
                        },
                        {
                            "description": "Market makers which are trading on this condition",
                            "name": "fixedProductMarketMakers",
                            "type": {
                                "kind": "NON_NULL",
                                "name": null,
                                "ofType": {
                                    "kind": "LIST",
                                    "name": null
                                }
                            }
                        }
                    ]
                },
                {
                    "name": "Condition_filter"
                },
                {
                    "name": "Condition_orderBy"
                },
                {
                    "name": "FixedProductMarketMaker"
                    "fields": [
                        {
                            "description": "Market maker address",
                            "name": "id",
                            "type": {
                                "kind": "NON_NULL",
                                "name": null,
                                "ofType": {
                                    "kind": "SCALAR",
                                    "name": "ID"
                                }
                            }
                        },
                        {
                            "description": "Address which deployed this market",
                            "name": "creator",
                            "type": {
                                "kind": "NON_NULL",
                                "name": null,
                                "ofType": {
                                    "kind": "SCALAR",
                                    "name": "Bytes"
                                }
                            }
                        },
                        {
                            "description": "Time at which this market was deployed",
                            "name": "creationTimestamp",
                            "type": {
                                "kind": "NON_NULL",
                                "name": null,
                                "ofType": {
                                    "kind": "SCALAR",
                                    "name": "BigInt"
                                }
                            }
                        },
                        {
                            "description": "Hash of deployment transactions",
                            "name": "creationTransactionHash",
                            "type": {
                                "kind": "NON_NULL",
                                "name": null,
                                "ofType": {
                                    "kind": "SCALAR",
                                    "name": "Bytes"
                                }
                            }
                        },
                        {
                            "description": "Token which is colleralising this market",
                            "name": "collateralToken",
                            "type": {
                                "kind": "NON_NULL",
                                "name": null,
                                "ofType": {
                                    "kind": "OBJECT",
                                    "name": "Collateral"
                                }
                            }
                        },
                        {
                            "description": "Conditions which this market is trading against",
                            "name": "conditions",
                            "type": {
                                "kind": "LIST",
                                "name": null,
                                "ofType": {
                                    "kind": "NON_NULL",
                                    "name": null
                                }
                            }
                        },
                        {
                            "description": "Percentage fee of trades taken by market maker. A 2% fee is represented as 2*10^16",
                            "name": "fee",
                            "type": {
                                "kind": "NON_NULL",
                                "name": null,
                                "ofType": {
                                    "kind": "SCALAR",
                                    "name": "BigInt"
                                }
                            }
                        },
                        {
                            "description": "Number of trades of any kind against this market maker",
                            "name": "tradesQuantity",
                            "type": {
                                "kind": "NON_NULL",
                                "name": null,
                                "ofType": {
                                    "kind": "SCALAR",
                                    "name": "BigInt"
                                }
                            }
                        },
                        {
                            "description": "Number of purchases of shares from this market maker",
                            "name": "buysQuantity",
                            "type": {
                                "kind": "NON_NULL",
                                "name": null,
                                "ofType": {
                                    "kind": "SCALAR",
                                    "name": "BigInt"
                                }
                            }
                        },
                        {
                            "description": "Number of sales of shares to this market maker",
                            "name": "sellsQuantity",
                            "type": {
                                "kind": "NON_NULL",
                                "name": null,
                                "ofType": {
                                    "kind": "SCALAR",
                                    "name": "BigInt"
                                }
                            }
                        },
                        {
                            "description": "Number of times liquidity has been added to this market maker",
                            "name": "liquidityAddQuantity",
                            "type": {
                                "kind": "NON_NULL",
                                "name": null,
                                "ofType": {
                                    "kind": "SCALAR",
                                    "name": "BigInt"
                                }
                            }
                        },
                        {
                            "description": "Number of times liquidity has been removed from this market maker",
                            "name": "liquidityRemoveQuantity",
                            "type": {
                                "kind": "NON_NULL",
                                "name": null,
                                "ofType": {
                                    "kind": "SCALAR",
                                    "name": "BigInt"
                                }
                            }
                        },
                        {
                            "description": "Market volume in terms of the underlying collateral value",
                            "name": "collateralVolume",
                            "type": {
                                "kind": "NON_NULL",
                                "name": null,
                                "ofType": {
                                    "kind": "SCALAR",
                                    "name": "BigInt"
                                }
                            }
                        },
                        {
                            "description": "Volume scaled by the number of decimals of collateralToken",
                            "name": "scaledCollateralVolume",
                            "type": {
                                "kind": "NON_NULL",
                                "name": null,
                                "ofType": {
                                    "kind": "SCALAR",
                                    "name": "BigDecimal"
                                }
                            }
                        },
                        {
                            "description": "Global volume of share purchases in USDC base units",
                            "name": "collateralBuyVolume",
                            "type": {
                                "kind": "NON_NULL",
                                "name": null,
                                "ofType": {
                                    "kind": "SCALAR",
                                    "name": "BigInt"
                                }
                            }
                        },
                        {
                            "description": "Global volume of share purchases in USDC scaled by 10^6",
                            "name": "scaledCollateralBuyVolume",
                            "type": {
                                "kind": "NON_NULL",
                                "name": null,
                                "ofType": {
                                    "kind": "SCALAR",
                                    "name": "BigDecimal"
                                }
                            }
                        },
                        {
                            "description": "Global volume of share sales in USDC base units",
                            "name": "collateralSellVolume",
                            "type": {
                                "kind": "NON_NULL",
                                "name": null,
                                "ofType": {
                                    "kind": "SCALAR",
                                    "name": "BigInt"
                                }
                            }
                        },
                        {
                            "description": "Global volume of share sales in USDC scaled by 10^6",
                            "name": "scaledCollateralSellVolume",
                            "type": {
                                "kind": "NON_NULL",
                                "name": null,
                                "ofType": {
                                    "kind": "SCALAR",
                                    "name": "BigDecimal"
                                }
                            }
                        },
                        {
                            "description": "Fees collected in terms of the underlying collateral value",
                            "name": "feeVolume",
                            "type": {
                                "kind": "NON_NULL",
                                "name": null,
                                "ofType": {
                                    "kind": "SCALAR",
                                    "name": "BigInt"
                                }
                            }
                        },
                        {
                            "description": "Fees scaled by the number of decimals of collateralToken",
                            "name": "scaledFeeVolume",
                            "type": {
                                "kind": "NON_NULL",
                                "name": null,
                                "ofType": {
                                    "kind": "SCALAR",
                                    "name": "BigDecimal"
                                }
                            }
                        },
                        {
                            "description": "Constant product parameter k",
                            "name": "liquidityParameter",
                            "type": {
                                "kind": "NON_NULL",
                                "name": null,
                                "ofType": {
                                    "kind": "SCALAR",
                                    "name": "BigInt"
                                }
                            }
                        },
                        {
                            "description": null,
                            "name": "scaledLiquidityParameter",
                            "type": {
                                "kind": "NON_NULL",
                                "name": null,
                                "ofType": {
                                    "kind": "SCALAR",
                                    "name": "BigDecimal"
                                }
                            }
                        },
                        {
                            "description": "Balances of each outcome token held by the market maker",
                            "name": "outcomeTokenAmounts",
                            "type": {
                                "kind": "NON_NULL",
                                "name": null,
                                "ofType": {
                                    "kind": "LIST",
                                    "name": null
                                }
                            }
                        },
                        {
                            "description": "Prices at which market maker values each outcome token",
                            "name": "outcomeTokenPrices",
                            "type": {
                                "kind": "NON_NULL",
                                "name": null,
                                "ofType": {
                                    "kind": "LIST",
                                    "name": null
                                }
                            }
                        },
                        {
                            "description": "Number of outcomes which this market maker is trading",
                            "name": "outcomeSlotCount",
                            "type": {
                                "kind": "SCALAR",
                                "name": "Int",
                                "ofType": null
                            }
                        },
                        {
                            "description": "Timestamp of last day during which someone made a trade",
                            "name": "lastActiveDay",
                            "type": {
                                "kind": "NON_NULL",
                                "name": null,
                                "ofType": {
                                    "kind": "SCALAR",
                                    "name": "BigInt"
                                }
                            }
                        },
                        {
                            "description": "Number of shares for tokens in the market maker's reserves",
                            "name": "totalSupply",
                            "type": {
                                "kind": "NON_NULL",
                                "name": null,
                                "ofType": {
                                    "kind": "SCALAR",
                                    "name": "BigInt"
                                }
                            }
                        },
                        {
                            "description": "Addresses which are supplying liquidity to the market maker",
                            "name": "poolMembers",
                            "type": {
                                "kind": "LIST",
                                "name": null,
                                "ofType": {
                                    "kind": "NON_NULL",
                                    "name": null
                                }
                            }
                        }
                    ]
                },
                {
                    "name": "FixedProductMarketMaker_filter"
                },
                {
                    "name": "FixedProductMarketMaker_orderBy"
                },
                {
                    "name": "FpmmFundingAddition"
                    "fields": [
                        {
                            "description": "Transaction Hash",
                            "name": "id",
                            "type": {
                                "kind": "NON_NULL",
                                "name": null,
                                "ofType": {
                                    "kind": "SCALAR",
                                    "name": "ID"
                                }
                            }
                        },
                        {
                            "description": "Timestamp at which funding addition occurred",
                            "name": "timestamp",
                            "type": {
                                "kind": "NON_NULL",
                                "name": null,
                                "ofType": {
                                    "kind": "SCALAR",
                                    "name": "BigInt"
                                }
                            }
                        },
                        {
                            "description": "FPMM to which funding is being added",
                            "name": "fpmm",
                            "type": {
                                "kind": "NON_NULL",
                                "name": null,
                                "ofType": {
                                    "kind": "OBJECT",
                                    "name": "FixedProductMarketMaker"
                                }
                            }
                        },
                        {
                            "description": "Account adding funding",
                            "name": "funder",
                            "type": {
                                "kind": "NON_NULL",
                                "name": null,
                                "ofType": {
                                    "kind": "OBJECT",
                                    "name": "Account"
                                }
                            }
                        },
                        {
                            "description": "Outcome tokens amounts added to FPMM",
                            "name": "amountsAdded",
                            "type": {
                                "kind": "NON_NULL",
                                "name": null,
                                "ofType": {
                                    "kind": "LIST",
                                    "name": null
                                }
                            }
                        },
                        {
                            "description": "Outcome tokens amounts refunded to funder",
                            "name": "amountsRefunded",
                            "type": {
                                "kind": "NON_NULL",
                                "name": null,
                                "ofType": {
                                    "kind": "LIST",
                                    "name": null
                                }
                            }
                        },
                        {
                            "description": "Liquidity shares minted to funder",
                            "name": "sharesMinted",
                            "type": {
                                "kind": "NON_NULL",
                                "name": null,
                                "ofType": {
                                    "kind": "SCALAR",
                                    "name": "BigInt"
                                }
                            }
                        }
                    ]
                },
                {
                    "name": "FpmmFundingAddition_filter"
                },
                {
                    "name": "FpmmFundingAddition_orderBy"
                },
                {
                    "name": "FpmmFundingRemoval"
                    "fields": [
                        {
                            "description": "Transaction Hash",
                            "name": "id",
                            "type": {
                                "kind": "NON_NULL",
                                "name": null,
                                "ofType": {
                                    "kind": "SCALAR",
                                    "name": "ID"
                                }
                            }
                        },
                        {
                            "description": "Timestamp at which funding removal occurred",
                            "name": "timestamp",
                            "type": {
                                "kind": "NON_NULL",
                                "name": null,
                                "ofType": {
                                    "kind": "SCALAR",
                                    "name": "BigInt"
                                }
                            }
                        },
                        {
                            "description": "FPMM to which funding is being removed",
                            "name": "fpmm",
                            "type": {
                                "kind": "NON_NULL",
                                "name": null,
                                "ofType": {
                                    "kind": "OBJECT",
                                    "name": "FixedProductMarketMaker"
                                }
                            }
                        },
                        {
                            "description": "Account removing funding",
                            "name": "funder",
                            "type": {
                                "kind": "NON_NULL",
                                "name": null,
                                "ofType": {
                                    "kind": "OBJECT",
                                    "name": "Account"
                                }
                            }
                        },
                        {
                            "description": "Outcome tokens amounts removed from FPMM",
                            "name": "amountsRemoved",
                            "type": {
                                "kind": "NON_NULL",
                                "name": null,
                                "ofType": {
                                    "kind": "LIST",
                                    "name": null
                                }
                            }
                        },
                        {
                            "description": null,
                            "name": "collateralRemoved",
                            "type": {
                                "kind": "NON_NULL",
                                "name": null,
                                "ofType": {
                                    "kind": "SCALAR",
                                    "name": "BigInt"
                                }
                            }
                        },
                        {
                            "description": "Liquidity shares burned by funder",
                            "name": "sharesBurnt",
                            "type": {
                                "kind": "NON_NULL",
                                "name": null,
                                "ofType": {
                                    "kind": "SCALAR",
                                    "name": "BigInt"
                                }
                            }
                        }
                    ]
                },
                {
                    "name": "FpmmFundingRemoval_filter"
                },
                {
                    "name": "FpmmFundingRemoval_orderBy"
                },
                {
                    "name": "FpmmPoolMembership"
                    "fields": [
                        {
                            "description": "funder address + pool address",
                            "name": "id",
                            "type": {
                                "kind": "NON_NULL",
                                "name": null,
                                "ofType": {
                                    "kind": "SCALAR",
                                    "name": "ID"
                                }
                            }
                        },
                        {
                            "description": "Market to which funder is providing funding",
                            "name": "pool",
                            "type": {
                                "kind": "NON_NULL",
                                "name": null,
                                "ofType": {
                                    "kind": "OBJECT",
                                    "name": "FixedProductMarketMaker"
                                }
                            }
                        },
                        {
                            "description": "Account which is providing funding",
                            "name": "funder",
                            "type": {
                                "kind": "NON_NULL",
                                "name": null,
                                "ofType": {
                                    "kind": "OBJECT",
                                    "name": "Account"
                                }
                            }
                        },
                        {
                            "description": "Amount of liquidity tokens owned by funder",
                            "name": "amount",
                            "type": {
                                "kind": "NON_NULL",
                                "name": null,
                                "ofType": {
                                    "kind": "SCALAR",
                                    "name": "BigInt"
                                }
                            }
                        }
                    ]
                },
                {
                    "name": "FpmmPoolMembership_filter"
                },
                {
                    "name": "FpmmPoolMembership_orderBy"
                },
                {
                    "name": "Global"
                    "fields": [
                        {
                            "description": "ID is empty string, this is a singleton",
                            "name": "id",
                            "type": {
                                "kind": "NON_NULL",
                                "name": null,
                                "ofType": {
                                    "kind": "SCALAR",
                                    "name": "ID"
                                }
                            }
                        },
                        {
                            "description": null,
                            "name": "numConditions",
                            "type": {
                                "kind": "NON_NULL",
                                "name": null,
                                "ofType": {
                                    "kind": "SCALAR",
                                    "name": "Int"
                                }
                            }
                        },
                        {
                            "description": null,
                            "name": "numOpenConditions",
                            "type": {
                                "kind": "NON_NULL",
                                "name": null,
                                "ofType": {
                                    "kind": "SCALAR",
                                    "name": "Int"
                                }
                            }
                        },
                        {
                            "description": null,
                            "name": "numClosedConditions",
                            "type": {
                                "kind": "NON_NULL",
                                "name": null,
                                "ofType": {
                                    "kind": "SCALAR",
                                    "name": "Int"
                                }
                            }
                        },
                        {
                            "description": "Number of unique traders interacting with Polymarket",
                            "name": "numTraders",
                            "type": {
                                "kind": "NON_NULL",
                                "name": null,
                                "ofType": {
                                    "kind": "SCALAR",
                                    "name": "BigInt"
                                }
                            }
                        },
                        {
                            "description": "Number of trades of any kind for all market makers",
                            "name": "tradesQuantity",
                            "type": {
                                "kind": "NON_NULL",
                                "name": null,
                                "ofType": {
                                    "kind": "SCALAR",
                                    "name": "BigInt"
                                }
                            }
                        },
                        {
                            "description": "Number of purchases of shares from any market maker",
                            "name": "buysQuantity",
                            "type": {
                                "kind": "NON_NULL",
                                "name": null,
                                "ofType": {
                                    "kind": "SCALAR",
                                    "name": "BigInt"
                                }
                            }
                        },
                        {
                            "description": "Number of sales of shares to any market maker",
                            "name": "sellsQuantity",
                            "type": {
                                "kind": "NON_NULL",
                                "name": null,
                                "ofType": {
                                    "kind": "SCALAR",
                                    "name": "BigInt"
                                }
                            }
                        },
                        {
                            "description": "Global volume in USDC base units",
                            "name": "collateralVolume",
                            "type": {
                                "kind": "NON_NULL",
                                "name": null,
                                "ofType": {
                                    "kind": "SCALAR",
                                    "name": "BigInt"
                                }
                            }
                        },
                        {
                            "description": "Global volume in USDC scaled by 10^6",
                            "name": "scaledCollateralVolume",
                            "type": {
                                "kind": "NON_NULL",
                                "name": null,
                                "ofType": {
                                    "kind": "SCALAR",
                                    "name": "BigDecimal"
                                }
                            }
                        },
                        {
                            "description": "Global fees in USDC base units",
                            "name": "collateralFees",
                            "type": {
                                "kind": "NON_NULL",
                                "name": null,
                                "ofType": {
                                    "kind": "SCALAR",
                                    "name": "BigInt"
                                }
                            }
                        },
                        {
                            "description": "Global fees in USDC scaled by 10^6",
                            "name": "scaledCollateralFees",
                            "type": {
                                "kind": "NON_NULL",
                                "name": null,
                                "ofType": {
                                    "kind": "SCALAR",
                                    "name": "BigDecimal"
                                }
                            }
                        },
                        {
                            "description": "Global volume of share purchases in USDC base units",
                            "name": "collateralBuyVolume",
                            "type": {
                                "kind": "NON_NULL",
                                "name": null,
                                "ofType": {
                                    "kind": "SCALAR",
                                    "name": "BigInt"
                                }
                            }
                        },
                        {
                            "description": "Global volume of share purchases in USDC scaled by 10^6",
                            "name": "scaledCollateralBuyVolume",
                            "type": {
                                "kind": "NON_NULL",
                                "name": null,
                                "ofType": {
                                    "kind": "SCALAR",
                                    "name": "BigDecimal"
                                }
                            }
                        },
                        {
                            "description": "Global volume of share sales in USDC base units",
                            "name": "collateralSellVolume",
                            "type": {
                                "kind": "NON_NULL",
                                "name": null,
                                "ofType": {
                                    "kind": "SCALAR",
                                    "name": "BigInt"
                                }
                            }
                        },
                        {
                            "description": "Global volume of share sales in USDC scaled by 10^6",
                            "name": "scaledCollateralSellVolume",
                            "type": {
                                "kind": "NON_NULL",
                                "name": null,
                                "ofType": {
                                    "kind": "SCALAR",
                                    "name": "BigDecimal"
                                }
                            }
                        }
                    ]
                },
                {
                    "name": "Global_filter"
                },
                {
                    "name": "Global_orderBy"
                },
                {
                    "name": "ID"
                },
                {
                    "name": "Int"
                },
                {
                    "name": "MarketPosition"
                    "fields": [
                        {
                            "description": null,
                            "name": "id",
                            "type": {
                                "kind": "NON_NULL",
                                "name": null,
                                "ofType": {
                                    "kind": "SCALAR",
                                    "name": "ID"
                                }
                            }
                        },
                        {
                            "description": "Market on which this position is on",
                            "name": "market",
                            "type": {
                                "kind": "NON_NULL",
                                "name": null,
                                "ofType": {
                                    "kind": "OBJECT",
                                    "name": "FixedProductMarketMaker"
                                }
                            }
                        },
                        {
                            "description": "Address which holds this position",
                            "name": "user",
                            "type": {
                                "kind": "NON_NULL",
                                "name": null,
                                "ofType": {
                                    "kind": "OBJECT",
                                    "name": "Account"
                                }
                            }
                        },
                        {
                            "description": "The outcome which this position is supporting",
                            "name": "outcomeIndex",
                            "type": {
                                "kind": "NON_NULL",
                                "name": null,
                                "ofType": {
                                    "kind": "SCALAR",
                                    "name": "BigInt"
                                }
                            }
                        },
                        {
                            "description": "Number of outcome shares that the user has ever bought",
                            "name": "quantityBought",
                            "type": {
                                "kind": "NON_NULL",
                                "name": null,
                                "ofType": {
                                    "kind": "SCALAR",
                                    "name": "BigInt"
                                }
                            }
                        },
                        {
                            "description": "Number of outcome shares that the user has ever sold",
                            "name": "quantitySold",
                            "type": {
                                "kind": "NON_NULL",
                                "name": null,
                                "ofType": {
                                    "kind": "SCALAR",
                                    "name": "BigInt"
                                }
                            }
                        },
                        {
                            "description": "Number of outcome shares that the user current has",
                            "name": "netQuantity",
                            "type": {
                                "kind": "NON_NULL",
                                "name": null,
                                "ofType": {
                                    "kind": "SCALAR",
                                    "name": "BigInt"
                                }
                            }
                        },
                        {
                            "description": "Total value of outcome shares that the user has bought",
                            "name": "valueBought",
                            "type": {
                                "kind": "NON_NULL",
                                "name": null,
                                "ofType": {
                                    "kind": "SCALAR",
                                    "name": "BigInt"
                                }
                            }
                        },
                        {
                            "description": "Total value of outcome shares that the user has sold",
                            "name": "valueSold",
                            "type": {
                                "kind": "NON_NULL",
                                "name": null,
                                "ofType": {
                                    "kind": "SCALAR",
                                    "name": "BigInt"
                                }
                            }
                        },
                        {
                            "description": "Total value paid by the user to enter this position",
                            "name": "netValue",
                            "type": {
                                "kind": "NON_NULL",
                                "name": null,
                                "ofType": {
                                    "kind": "SCALAR",
                                    "name": "BigInt"
                                }
                            }
                        },
                        {
                            "description": "Total amount of fees paid by user in relation to this position",
                            "name": "feesPaid",
                            "type": {
                                "kind": "NON_NULL",
                                "name": null,
                                "ofType": {
                                    "kind": "SCALAR",
                                    "name": "BigInt"
                                }
                            }
                        }
                    ]
                },
                {
                    "name": "MarketPosition_filter"
                },
                {
                    "name": "MarketPosition_orderBy"
                },
                {
                    "name": "Merge"
                },
                {
                    "name": "Merge_filter"
                },
                {
                    "name": "Merge_orderBy"
                },
                {
                    "name": "OrderDirection"
                },
                {
                    "name": "Query"
                },
                {
                    "name": "Redemption"
                },
                {
                    "name": "Redemption_filter"
                },
                {
                    "name": "Redemption_orderBy"
                },
                {
                    "name": "Split"
                },
                {
                    "name": "Split_filter"
                },
                {
                    "name": "Split_orderBy"
                },
                {
                    "name": "String"
                },
                {
                    "name": "Subscription"
                },
                {
                    "name": "TradeType"
                },
                {
                    "name": "Transaction"
                    "fields": [
                        {
                            "description": "Transaction Hash",
                            "name": "id",
                            "type": {
                                "kind": "NON_NULL",
                                "name": null,
                                "ofType": {
                                    "kind": "SCALAR",
                                    "name": "ID"
                                }
                            }
                        },
                        {
                            "description": "Buy or Sell transaction",
                            "name": "type",
                            "type": {
                                "kind": "NON_NULL",
                                "name": null,
                                "ofType": {
                                    "kind": "ENUM",
                                    "name": "TradeType"
                                }
                            }
                        },
                        {
                            "description": "Timestamp at which transaction occurred",
                            "name": "timestamp",
                            "type": {
                                "kind": "NON_NULL",
                                "name": null,
                                "ofType": {
                                    "kind": "SCALAR",
                                    "name": "BigInt"
                                }
                            }
                        },
                        {
                            "description": "Market which transaction is interacting with",
                            "name": "market",
                            "type": {
                                "kind": "NON_NULL",
                                "name": null,
                                "ofType": {
                                    "kind": "OBJECT",
                                    "name": "FixedProductMarketMaker"
                                }
                            }
                        },
                        {
                            "description": "Account performing transaction",
                            "name": "user",
                            "type": {
                                "kind": "NON_NULL",
                                "name": null,
                                "ofType": {
                                    "kind": "OBJECT",
                                    "name": "Account"
                                }
                            }
                        },
                        {
                            "description": "Amount of collateral in trade",
                            "name": "tradeAmount",
                            "type": {
                                "kind": "NON_NULL",
                                "name": null,
                                "ofType": {
                                    "kind": "SCALAR",
                                    "name": "BigInt"
                                }
                            }
                        },
                        {
                            "description": "Amount of collateral paid in fees",
                            "name": "feeAmount",
                            "type": {
                                "kind": "NON_NULL",
                                "name": null,
                                "ofType": {
                                    "kind": "SCALAR",
                                    "name": "BigInt"
                                }
                            }
                        },
                        {
                            "description": "Index of outcome token being bought or sold",
                            "name": "outcomeIndex",
                            "type": {
                                "kind": "NON_NULL",
                                "name": null,
                                "ofType": {
                                    "kind": "SCALAR",
                                    "name": "BigInt"
                                }
                            }
                        },
                        {
                            "description": "Amount of outcome tokens being bought or sold",
                            "name": "outcomeTokensAmount",
                            "type": {
                                "kind": "NON_NULL",
                                "name": null,
                                "ofType": {
                                    "kind": "SCALAR",
                                    "name": "BigInt"
                                }
                            }
                        }
                    ]
                },
                {
                    "name": "Transaction_filter"
                },
                {
                    "name": "Transaction_orderBy"
                },
                {
                    "name": "_Block_"
                },
                {
                    "name": "_Meta_"
                },
                {
                    "name": "_SubgraphErrorPolicy_"
                }
            ]
        }
    }
}