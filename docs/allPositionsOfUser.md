# All Positions of User

Used to look at all the current/past positions of a user, the difference being the resolutionTimestamp in the market field

**URL** : `/allPositionsOfUser?hash={userWalletAddress}/`

**Method** : `GET`

**Auth required** : NO

## Success Response

**Code** : `200 OK`

**Content example**

```json
[
    {
        "feesPaid": "0",
        "id": "0x0052f24bdfa63331a654ddab54e167593a442ea41",
        "market": {
            "conditions": [
                {
                    "id": "0x1debe9432c970f6e08972fd54bfe7242ff3c8e2bdfc68c8a0c77d8876e8dd33c",
                    "payouts": null,
                    "resolutionTimestamp": null, // An example of an unresolved position

                }
            ],
            "id": "0x0052f24bdfa63331a654ddab54e167593a442ea4"
        },
        "netQuantity": "4589097080",
        "netValue": "4240601935",
        "outcomeIndex": "1",
        "quantityBought": "4589097080",
        "quantitySold": "0",
        "valueBought": "4240601935",
        "valueSold": "0"
    },
    ...
    {
        "feesPaid": "0",
        "id": "0x00f365b53ca9477dbad1fcda0b820cfa7f38d27a0",
        "market": {
            "conditions": [
                {
                    "id": "0x35b24743c50c193259ba6ec0412857950928522ee4aefeb094e9660958f93936",
                    "payouts": [
                        "1",
                        "0"
                    ],
                    "resolutionTimestamp": "1623427345", // An example of a resolved position
                }
            ],
            "id": "0x00f365b53ca9477dbad1fcda0b820cfa7f38d27a"
        },
        "netQuantity": "0",
        "netValue": "-16659022945",
        "outcomeIndex": "0",
        "quantityBought": "39060813607",
        "quantitySold": "39060813607",
        "valueBought": "22401790662",
        "valueSold": "39060813607"
    },
```

## Error Response

**Condition** : If 'userWalletAddress' isn't provided.

**Code** : `400 BAD REQUEST`

**Condition** : There was an error querying the graph.

**Code** : `500 INTERNAL SERVER ERROR`