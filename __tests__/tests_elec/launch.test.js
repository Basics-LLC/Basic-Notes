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


test.describe('Render the first page', async () => {
  test('text elements exist', async () => {
    expect(await page.$('#main')).toBeTruthy();
    expect(await page.$('#title')).toBeTruthy();
    expect(await page.$('#textarea')).toBeTruthy();
    expect(await page.$('#fileLoader')).toBeTruthy();
  });
  test('buttons exists', async () => {
    expect(await page.$('#button-group')).toBeTruthy();
    expect(await page.$('#new-file')).toBeTruthy();
    expect(await page.$('#upload-file')).toBeTruthy();
    expect(await page.$('#save-file')).toBeTruthy();
  });
});

test.describe('file handling', async () => {
  test('new file button', async () => {
    const titleInput = 'test title';
    const contentInput = 'test content';
    let title;
    let content;
    // fill test title and content
    await page.locator('#title').fill(titleInput);
    await page.locator('#textarea').fill(contentInput);
    // check if title and content are filled correctlys
    title = await page.inputValue('#title');
    expect(title).toBe(titleInput);
    content = await page.inputValue('#textarea');
    expect(content).toBe(contentInput);

    // check new-file button
    await page.click('#new-file');
    title = await page.inputValue('#title');
    expect(title).toBe('');
    content = await page.inputValue('#textarea');
    expect(content).toBe('');
  });

  test('upload file button', async () => {
    await page.locator('#save-file').click();
    await page.locator('#fileLoader').setInputFiles('./__tests__/tests_elec/testUpload.txt');
    const title = await page.inputValue('#title');
    expect(title).toBe('testUpload.txt');
    const content = await page.inputValue('#textarea');
    expect(content).toBe('File Uploaded!');
  });
});
