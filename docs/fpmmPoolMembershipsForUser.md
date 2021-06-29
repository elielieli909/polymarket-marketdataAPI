# FPMM Pool Memberships For User

Used to get all the current pool memberships of a given user, including the pool ID and number of LP tokens held

**URL** : `/fpmmPoolMembershipsForUser?hash={userWalletAddress}`

**Method** : `GET`

**Auth required** : NO

## Success Response

**Code** : `200 OK`

**Content example**

```json
[
    {
        "amount": "432173626",
        "id": "0x0052f24bdfa63331a654ddab54e167593a442ea4"
    },
    ...
        {
        "amount": "555000000",
        "id": "0xffc0dd57febf51a5188094b172ecde2fe2255b4d"
    }
]
```

## Error Response

**Condition** : If 'userWalletAddress' isn't provided.

**Code** : `400 BAD REQUEST`

**Condition** : There was an error querying the graph.

**Code** : `500 INTERNAL SERVER ERROR`