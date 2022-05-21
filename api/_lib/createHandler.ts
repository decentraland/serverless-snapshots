import type { VercelRequest, VercelResponse } from '@vercel/node'
import { Clip, getScreenshot, ViewPort } from './screenshot'

export function createHandler(getUrl: (address: string) => string, viewport: ViewPort, clip?: Clip) {
  return async (req: VercelRequest, res: VercelResponse) => {
    const { address } = req.query
    if (!address || Array.isArray(address)) {
      res.status(400).json({ error: 'Invalid address' })
      return
    }
    const screenshot = await getScreenshot(getUrl(address), '.is-loaded', viewport, clip)
    res.setHeader('content-type', 'image/png')
    res.setHeader(
      'cache-control',
      `public, max-age=2592000, s-maxage=2592000` // 30 days of cache
    )
    res.status(200).send(screenshot)
  }
}
