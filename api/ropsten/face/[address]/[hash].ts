import { createHandler } from '../../../_lib/createHandler'

export default createHandler(
  (address) =>
    `https://wearable-preview.decentraland.org/?profile=${address}&transparentBackground&zoom=70&offsetY=1.3&centerBoundingBox=false&autoRotateSpeed=0&env=dev`,
  {
    width: 512,
    height: 1024 + 512,
  },
  {
    x: 0,
    y: 0,
    width: 512,
    height: 512,
  }
)
