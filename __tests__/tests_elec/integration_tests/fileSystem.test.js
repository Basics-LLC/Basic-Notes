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

// click the "new file" button should clear the title and text area
test('new file button', async () => {
  // check new-file button
  await page.click('#new-file');
  const title = await page.inputValue('#title');
  expect(title).toBe('');
  const content = await page.inputValue('#textarea');
  expect(content).toBe('');
});

// type in a new title
test('type in new title', async () => {
  const titleInput = 'test title';
  await page.locator('#title').fill(titleInput);
  const title = await page.inputValue('#title');
  expect(title).toBe(titleInput);
});

