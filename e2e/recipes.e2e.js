/* global device, element, by, waitFor, expect */

describe('Recipe Finder flow', () => {
  beforeAll(async () => {
    await device.launchApp({ delete: true, newInstance: true });
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('browses recipes and manages favourites', async () => {
    await waitFor(element(by.id('recipe-list')))
      .toBeVisible()
      .withTimeout(20000);

    await waitFor(element(by.id('recipe-card-1')))
      .toBeVisible()
      .withTimeout(20000);

    await element(by.id('recipe-card-1')).tap();

    await waitFor(element(by.id('recipe-detail-scroll')))
      .toBeVisible()
      .withTimeout(10000);

    await expect(element(by.id('favourite-toggle'))).toBeVisible();
    await element(by.id('favourite-toggle')).tap();

    await device.pressBack();

    await element(by.id('tab-favourites')).tap();

    await waitFor(element(by.id('favourites-list')))
      .toBeVisible()
      .withTimeout(10000);
  });
});
