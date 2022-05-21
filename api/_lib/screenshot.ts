import chrome from 'chrome-aws-lambda'
import puppeteer from 'puppeteer-core'
import { isDev } from './env'

/**
 * In order to have the function working in both windows and macOS
 * we need to specify the respecive path of the chrome executable for
 * both cases.
 */
const exePath =
  process.platform === 'win32'
    ? 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe'
    : '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'

const getOptions = async (isDev: boolean) => {
  /**
   * If used in a dev environment, i.e. locally, use one of the local
   * executable path
   */
  if (isDev) {
    return {
      args: [],
      executablePath: exePath,
      headless: true,
    }
  }
  /**
   * Else, use the path of chrome-aws-lambda and its args
   */
  return {
    args: chrome.args,
    executablePath: await chrome.executablePath,
    headless: chrome.headless,
  }
}

export type ViewPort = {
  width: number
  height: number
}

export type Clip = {
  x: number
  y: number
  width: number
  height: number
}

export const getScreenshot = async (url: string, selector: string, viewport: ViewPort, clip?: Clip) => {
  const options = await getOptions(isDev)
  const browser = await (isDev ? puppeteer : chrome.puppeteer).launch(options)
  const page = await browser.newPage()
  await page.setViewport({
    deviceScaleFactor: 2,
    ...viewport,
  })
  await page.goto(url)
  const container = await page.waitForSelector(selector)
  const buffer = await container.screenshot({
    encoding: 'binary',
    clip,
  })
  return buffer
}
