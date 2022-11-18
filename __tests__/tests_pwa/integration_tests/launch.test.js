import {test, expect} from '@playwright/test';


test('Have SimpleMDE', async ({page}) => {
  await page.goto('./');
  await expect(page.locator('.CodeMirror-scroll'))
      .toHaveClass(/CodeMirror-scroll/);
});

test('Screenshot Check', async ({page}) => {
  await page.goto('./');
  await page.setViewportSize({width: 1600, height: 1200});
  await expect(page).toHaveScreenshot();
});
