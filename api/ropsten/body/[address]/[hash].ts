import { createHandler } from '../../../_lib/createHandler'

export default createHandler(
  (address) =>
    `https://wearable-preview.decentraland.org/?profile=${address}&transparentBackground&autoRotateSpeed=0&env=dev`,
  {
    width: 512,
    height: 1024,
  }
)
