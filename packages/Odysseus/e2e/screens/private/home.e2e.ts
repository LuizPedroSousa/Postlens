import { beforeEach, device, expect } from 'detox'
describe('[E2E] Screens/Home', () => {
  beforeAll(async () => {
    await device.launchApp()
  })

  beforeEach(async () => {
    await device.reloadReactNative()
  })

  it('should have hello world in home', async () => {
    const title = element(by.id('text'))
    await expect(title).toBeVisible()

    await expect(title).toHaveText('Hello World')
  })
})
