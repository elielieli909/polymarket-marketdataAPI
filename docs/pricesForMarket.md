# Historical Prices by Market (by time)

Used to query a set of outcome token prices over a desired period of time.

**URL** : `/pricesForMarket?hash={fpmmContractAddress}&startTime={timestampToStartQuery}/`

**Method** : `GET`

**Auth required** : NO

**Optional Query Parameters**

endTime={timestampToEndQuery} -- defaults to now

stepSize={numBlocks} -- defaults to 43200 (results in prices by the ~1 day, since Polygon block times are ~2s)

## Success Response

**Code** : `200 OK`

**Content example**

```json
[
    {
        "timestamp": 1623234600,
        "block": 14881675,
        "prices": [
            "0.1194644367179036271830628805301307",
            "0.8805355632820963728169371194698693"
        ]
    },
    ...
    {
        "timestamp": 1624953366,
        "block": 15702475,
        "prices": [
            "0.1194644367179036271830628805301307",
            "0.8805355632820963728169371194698693"
        ]
    }
]
```

## Error Response

**Condition** : If 'userWalletAddress' or 'startTime' isn't provided.

**Code** : `400 BAD REQUEST`

**Condition** : There was an error either fetching the block number associated with the desired timestamps, or there was an error querying the graph.

**Code** : `500 INTERNAL SERVER ERROR`