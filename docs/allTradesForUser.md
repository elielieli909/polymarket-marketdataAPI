# Get All Trades By a User

Used to grab all the trades performed by a given user.

**URL** : `/allTradesForUser?hash={userWalletAddress}/`

**Method** : `GET`

**Auth required** : NO

## Success Response

**Code** : `200 OK`

**Content example**

```json
[
    {
        "feeAmount": "74760000",
        "id": "0x8b9cde8d874a1d6cf179909f89d2806095a111795a7f09097c32945dd39d0148",
        "market": {
            "id": "0x365e12b47919b0e3bcf1c8cc3ecd8fb88b80560f"
        },
        "outcomeIndex": "0",
        "outcomeTokensAmount": "9237428300",
        "timestamp": "1604419407",
        "tradeAmount": "3738000000",
        "type": "Buy"
    },
    ...
    {
        "feeAmount": "5800000",
        "id": "0x172c44faad2e4fda1ef763dbcd62781ec97c6c8e33f1fbc458e7af8c486cfbaf",
        "market": {
            "id": "0xd2d782b095467a48e60a4eb858233db98b6c1dc8"
        },
        "outcomeIndex": "1",
        "outcomeTokensAmount": "2135447678",
        "timestamp": "1609453794",
        "tradeAmount": "290000000",
        "type": "Buy"
    }
]
```

## Error Response

**Condition** : If 'userWalletAddress' isn't provided.

**Code** : `400 BAD REQUEST`

**Condition** : There was an error querying the graph.

**Code** : `500 INTERNAL SERVER ERROR`