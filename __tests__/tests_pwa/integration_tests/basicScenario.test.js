import {test, expect} from '@playwright/test';
const fs = require('fs');

test('Upload File', async ({page}) => {
  await page.goto('./');
  const [fileChooser] = await Promise.all([
    page.waitForEvent('filechooser'),
    page.locator('#upload-file').click(),
  ]);
  await fileChooser
      .setFiles('./__tests__/tests_pwa/integration_tests/test.md');
  await page.setViewportSize({width: 1600, height: 1200});
  await expect(page).toHaveScreenshot();
});

test('Download File', async ({page}) => {
  await page.goto('./');
  await page.locator('#upload-file').click();
  await page.locator('#fileLoader')
      .setInputFiles('./__tests__/tests_pwa/integration_tests/test.md');

  const [download] = await Promise.all([
    page.waitForEvent('download'),
    page.locator('#save-file').click(),
  ]);

  const suggestedFileName = download.suggestedFilename();
  const filePath = './__tests__/tests_pwa/integration_tests/download/' +
    suggestedFileName;
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath, function(err) {
      if (err) throw err;
      return;
    });
  }
  await download.saveAs(filePath);
  expect(fs.existsSync(filePath)).toBeTruthy();

  const originalBuf = fs
      .readFileSync('./__tests__/tests_pwa/integration_tests/test.md');
  const testBuf = fs.readFileSync(filePath);
  expect(originalBuf.equals(testBuf));
});

test('Clear Content', async ({page}) => {
  await page.goto('./');
  await page.locator('#upload-file').click();
  await page.locator('#fileLoader')
      .setInputFiles('./__tests__/tests_pwa/integration_tests/test.md');
  await page.locator('#new-file').click();
  await page.setViewportSize({width: 1600, height: 1200});
  await expect(page).toHaveScreenshot();
});
