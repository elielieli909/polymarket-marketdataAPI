# Login

Used to grab a list of all accounts on Polymarket.

**URL** : `/allAccounts/`

**Method** : `GET`

**Auth required** : NO

## Success Response

**Code** : `200 OK`

**Content example**

```json
[
    {
        "creationTimestamp": "1599166595",
        "id": "0x0000000000000000000000000000000000000000",
        "lastSeenTimestamp": "1599166595",
        "lastTradedTimestamp": "0",
        "scaledCollateralVolume": "0"
    },
    ...
    {
        "creationTimestamp": "1609332054",
        "id": "0xfffceabfa071e256cdcb1ba786156abc007b5f23",
        "lastSeenTimestamp": "1611239504",
        "lastTradedTimestamp": "1610017246",
        "scaledCollateralVolume": "42.057712"
    }
]
```

## Error Response

**Condition** : If there was an issue querying the graph.

**Code** : `500 INTERNAL SERVER ERROR`