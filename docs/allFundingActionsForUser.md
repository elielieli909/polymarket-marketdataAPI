# All Funding Actions by a Given User

Used to grab all the fpmm Funding Actions performed by a user

**URL** : `/allFundingActionsForUser?hash={userWalletAddress}/`

**Method** : `GET`

**Auth required** : NO

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
    "fpmmFundingAdditions": [
        {
            "amountsAdded": [
                "99000000",
                "99000000"
            ],
            "amountsRefunded": [
                "0",
                "0"
            ],
            "fpmm": {
                "id": "0x6359a2642bfe3f5b8b5302a3e1bdf63c0b1caf2f"
            },
            "id": "0x01c5543a5c02e7f0beff3d7fee514b6d5f9fa5bb4afdeb889a9cf9218db8674e",
            "sharesMinted": "99000000",
            "timestamp": "1623701033"
        },
        ...
    ],
    "fpmmFundingRemovals": [
        {
            "amountsRemoved": [
                "407155885",
                "9215068020"
            ],
            "collateralRemoved": "59677451",
            "fpmm": {
                "id": "0xca6992881e2864de80f8a92f20143450a517bb78"
            },
            "id": "0x01e056b6d9aef04755eae006f02aa5d0d5c1b2f6fda399197617a3fbec60c63d",
            "sharesBurnt": "1937000000",
            "timestamp": "1623783388"
        },
        ...
    ]
}
```

## Error Response

**Condition** : If 'userWalletAddress' isn't provided.

**Code** : `400 BAD REQUEST`

**Condition** : There was an error querying the graph.

**Code** : `500 INTERNAL SERVER ERROR`