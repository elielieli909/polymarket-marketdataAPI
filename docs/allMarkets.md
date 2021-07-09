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
    "buysQuantity": "31",
    "collateralBuyVolume": "780870000",
    "collateralSellVolume": "230131026",
    "collateralToken": {
      "id": "0x2791bca1f2de4661ed88a30c99a7a9449aa84174"
    },
    "collateralVolume": "1011001026",
    "conditions": [
      {
        "id": "0x312730a90ccb57a3f92f64b2f6d04f8185e050615fdac45b8ba4b4a2f61c61e2",
        When this condition is resolved, payouts will show an array of form [0/1,0/1] with the winning outcome equal to 1, and the resolutionTimestamp will be a timestamp in seconds.
        "payouts": null,
        "resolutionTimestamp": null
      }
    ],
    "creationTimestamp": "1625675020",
    "creationTransactionHash": "0x27a975af34ab6d95233822202ed0ac17b0b46ee7f02e6c0c14fa8f17bedaaa9a",
    "creator": "0xef2e639bbdbbaf483cb8e9faae20b96534c740d3",
    "fee": "20000000000000000",
    "feeVolume": "20313947",
    "id": "0x24a8b5b25eb8b2512a94982ede3319ca635936a6",
    "lastActiveDay": "18817",
    "liquidityAddQuantity": "5",
    "liquidityParameter": "888815638",
    "liquidityRemoveQuantity": "0",
    "outcomeSlotCount": 2,
    "outcomeTokenAmounts": [
      "473636726",
      "1667930706"
    ],
    "outcomeTokenPrices": [
      "0.7788364172321798737551963294891944",
      "0.2211635827678201262448036705108056"
    ],
    "poolMembers": [
      {
        "id": "0x8ad5a4a650183f9d214a09852eab0a100b93da26"
      },
      {
        "id": "0x8ed6d1c56c2b23e584781625a05706d80a5d3438"
      },
      {
        "id": "0xf1a4da93db18cff7e1e6083f7850ab64e257105a"
      }
    ],
    "scaledCollateralBuyVolume": "780.87",
    "scaledCollateralSellVolume": "230.131026",
    "scaledCollateralVolume": "1011.001026",
    "scaledFeeVolume": "20.313947",
    "scaledLiquidityParameter": "888.815638",
    "sellsQuantity": "9",
    "totalSupply": "888815625",
    "tradesQuantity": "40",
    "question": "Will EIP-1559 be implemented on the Ethereum mainnet before August 5, 2021?",
    "outcomes": [
      "Yes",
      "No"
    ],
    "description": "This is a market on whether EIP-1559 will be implemented on the Ethereum mainnet prior to the resolution date, August 5 2021, 12:00:00 AM ET. This market will resolve to \"Yes\" if EIP-1559 is implemented on the Ethereum mainnet prior to the resolution date, and \"No\" otherwise. In the event of ambiguity in terms of the market outcome, the market will be resolved at the sole discretion of the Markets Integrity Committee (MIC). ",
    "market_type": "normal"
  },
    ...
]
```

## Error Response

**Condition** : There was an error querying the graph or Strapi.

**Code** : `500 INTERNAL SERVER ERROR`
