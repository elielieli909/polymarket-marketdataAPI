# All Markets

Query details about every Market Maker on Polymarket, live or expired

**URL** : `/allMarkets/`

**Method** : `GET`

**Auth required** : NO

## Success Response

**Code** : `200 OK`

**Content example**

```json
[
    {
        "buysQuantity": "46",
        "collateralBuyVolume": "15024000000",
        "collateralSellVolume": "6857058330",
        "collateralToken": {
            "id": "0x2791bca1f2de4661ed88a30c99a7a9449aa84174"
        },
        "collateralVolume": "21881058330",
        "conditions": [
            {
                "id": "0xfa8cc293e14872fca0c7e8b240360683e392e1d7a4b5ac7616b1f7e50c454ad2",
                // payouts and resultionTimestamp will be null if the market hasn't yet been resolved
                "payouts": [
                    "0",
                    "1"
                ],
                "resolutionTimestamp": "1604334803"
            }
        ],
        "creationTimestamp": "1602538252",
        "creationTransactionHash": "0xcbfb75c0fc542dcd4a49cb3fbb8f097190ab06a996eda3b49104649b000bd035",
        "creator": "0xef2e639bbdbbaf483cb8e9faae20b96534c740d3",
        "fee": "20000000000000000",
        "feeVolume": "440419941",
        "id": "0xd4d7c117645a85bcbe39bfe9d8847628f75734b0",
        "lastActiveDay": "18641",
        "liquidityAddQuantity": "15",
        "liquidityParameter": "0",
        "liquidityRemoveQuantity": "6",
        "outcomeSlotCount": 2,
        "outcomeTokenAmounts": [
            "0",
            "0"
        ],
        "outcomeTokenPrices": [
            "0",
            "0"
        ],
        "poolMembers": [
            {
                "id": "0x188b1a39af42c30c5063b242f021aa5fba7e3dd1"
            },
            {
                "id": "0xd7a308889d620b25f92fc7d2e9bf1c21d5cebf3c"
            },
            {
                "id": "0xfc12bd975d6cc359b43d13967ee3c06c2f0223ef"
            }
        ],
        "scaledCollateralBuyVolume": "15024",
        "scaledCollateralSellVolume": "6857.05833",
        "scaledCollateralVolume": "21881.05833",
        "scaledFeeVolume": "440.419941",
        "scaledLiquidityParameter": "0",
        "sellsQuantity": "51",
        "totalSupply": "0",
        "tradesQuantity": "97"
    },
    ...
]
```

## Error Response

**Condition** : There was an error querying the graph.

**Code** : `500 INTERNAL SERVER ERROR`