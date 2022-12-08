import {_electron as electron} from 'playwright';
import {test, expect} from '@playwright/test';

let electronApp;
let page;
test.beforeAll(async () => {
  electronApp = await electron.launch({args: ['main.js']});
  page = await electronApp.firstWindow();
});

test.afterAll(async () => {
  await electronApp.close();
});

test('Have SimpleMDE', async () => {
  await expect(page.locator('.CodeMirror-scroll'))
      .toHaveClass(/CodeMirror-scroll/);
});

test('Screenshot Check', async () => {
  await page.setViewportSize({width: 1600, height: 1200});
  await expect(page).toHaveScreenshot();
});
