import type { VercelRequest, VercelResponse } from '@vercel/node'
import fetch from 'node-fetch'

export enum Network {
  MAINNET = 'mainnet',
  ROPSTEN = 'ropsten',
}

export enum Type {
  FACE = 'face',
  BODY = 'body',
}

export function createRedirect(network: Network, type: Type) {
  return async (req: VercelRequest, res: VercelResponse) => {
    const { address } = req.query
    if (!address) {
      res.status(400).json({ error: 'Invalid address' })
    }

    let peer: string
    switch (network) {
      case 'mainnet': {
        peer = 'https://peer.decentraland.org'
        break
      }
      case 'ropsten': {
        peer = 'https://peer.decentraland.zone'
        break
      }
      default: {
        res.status(400).json({ error: 'Invalid network' })
        return
      }
    }
    try {
      const resp = await fetch(`${peer}/content/entities/profile?pointer=${address}`)
      if (!resp.ok) {
        throw new Error(`Could not fetch profile entity for address="${address}"`)
      } else {
        const entities = (await resp.json()) as { id?: string }[]
        if (entities.length === 0) {
          throw new Error(`No profile entity found for address="${address}"`)
        }
        const { id } = entities[0]
        if (!id) {
          throw new Error(`Invalid id found in profile entity for address="${address}"`)
        }
        res.setHeader('Location', `/api/${network}/${type}/${address}/${id}`)
        res.status(302).send('')
      }
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }
}
