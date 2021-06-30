# All Trades Performed on a Given Market Maker

Used to look at all the trades performed on a fpmm

**URL** : `/allTradesForMarket?hash={fpmmAddress}/`

**Method** : `GET`

**Auth required** : NO

## Success Response

**Code** : `200 OK`

**Content example**

```json
[
    {
        "feeAmount": "4000000",
        "id": "0x377db5febaaa7068bb744926778c68cc40c9c2109268ad089ac1da4281d916f2",
        "market": {
            "id": "0x012fbf9a6320ac4b244cac49e391e901932ac7b4"
        },
        "outcomeIndex": "1",
        "outcomeTokensAmount": "291292162",
        "timestamp": "1606754123",
        "tradeAmount": "200000000",
        "type": "Buy",
        "user": {
            "id": "0x7e16925d66dbd5e87ddfb44aea9e8cd2d1df36b4"
        }
    },
    ...
    {
        "feeAmount": "129",
        "id": "0xf6a3f742a882447ac238def1d8c6ed569d6c1ad4232a04d1c3f09b6a1d72ea26",
        "market": {
            "id": "0x012fbf9a6320ac4b244cac49e391e901932ac7b4"
        },
        "outcomeIndex": "0",
        "outcomeTokensAmount": "1988134422",
        "timestamp": "1620636326",
        "tradeAmount": "6366",
        "type": "Sell",
        "user": {
            "id": "0x4c0170c18fd89b2a05eb5e0c2761930583b2ebf4"
        }
    }
]
```

## Error Response

**Condition** : If 'fpmmAddress' isn't provided.

**Code** : `400 BAD REQUEST`

**Condition** : There was an error querying the graph.

**Code** : `500 INTERNAL SERVER ERROR`
```