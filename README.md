# Serverless Snapshots

This serverless functions can generate a snapshot of the face or the full body of an avatar in mainnet or ropsten.

There are 2 endpoints in the api:

- `GET /api/:network/:type/:address`: This endpoint will fetch the currently pointed profile entity in the desired network for a given address, and redirect with a 302 status code to `/api/:network/:type/:address/:hash` where `:hash` is the entity id.

- `GET /api/:network/:type/:address/:hash`: This endpoint will generate the desired image type (face or body) for the given address and network, for particular hash, and it will return it with headers to aggressively cache it at the edges/cdn.

The rationale behind this design is to have the first endpoint to be the one used by consumers of the API, and have the second one act as cache, only generating images for new profile deployments.
