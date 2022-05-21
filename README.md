# Serverless Snapshots

This serverless functions can generate a snapshot of the face or the full body of an avatar in mainnet or ropsten.

There are 2 endpoints in the api:

- `GET /api/:network/:type/:address`: This endpoint will fetch the currently pointed profile entity in the desired network for a given address, and redirect with a 302 status code to `/api/:network/:type/:address/:hash` where `:hash` is the entity id.

- `GET /api/:network/:type/:address/:hash`: This endpoint will generate the image desired image (face/body) for the given address and network, for particular hash, and it will return it with headers to permacache it at the edges/cdn.
