import {test, expect} from '@playwright/test';

test.beforeEach(async ({page}) => {
  page.on('console', async (msg) => {
    const values = [];
    for (const arg of msg.args()) {
      values.push(await arg.jsonValue());
    }
    console.log(...values);
  });
  await page.addInitScript(() => {
    /**
     * This class is used to mock FileSystemDirectoryHandler
     */
    class MockFSDirectryHandlerClass {
      kind = '';
      name = '';
      _itemList = [];
      dirHandler = null;
      content = '';

      /**
       * Constructor
       * @param {string} kind file/directory
       * @param {string} name name of the file/directory
       * @param {MockFSDirectryHandlerClass} dirHandler
       * the directory handler of it
       */
      constructor(kind, name, dirHandler) {
        this.kind = kind;
        this.name = name;
        this.dirHandler = dirHandler;
        this.content = 'content ' + name[4];
      }

      /**
       * Store list of file/directory in a directory
       * @param {array} mockItemList The list of file/directory
       */
      setValues(mockItemList) {
        this._itemList = [];
        for (const item of mockItemList) {
          this._itemList.push(item);
        }
      }

      /**
       * Return the list of file/directory in a directory
       * @return {array} The list of of file/directory in a directory
       */
      values() {
        return this._itemList;
      }

      /**
       * Add a single file/directory handler
       * @param {MockFSDirectryHandlerClass} fileHandler
       * Newly added file handler
       */
      addValue(fileHandler) {
        this._itemList.push(fileHandler);
      }

      /**
       * Return this item(file in general)
       * @return {MockFSDirectryHandlerClass} Object isself
       */
      getFile() {
        if (this.dirHandler !== null) {
          this.dirHandler.addValue(this);
          this.dirHandler = null;
        }
        return this;
      }

      /**
       * Find the mocked file handler by the file name
       * @param {string} fileName The name of the target file
       * @return {MockFSDirectryHandlerClass}
       * The mocked file handler
       */
      getFileHandle(fileName) {
        for (const file of this._itemList) {
          if (file.name === fileName) {
            return file;
          }
        }
        return null;
      }

      /**
       * Return a mock stream object.
       * @return {MockStream} A mock stream object
       */
      stream() {
        return new MockStream(this.content);
      }

      /**
       * Return a mocked Writable
       * @return {MockFSDirectryHandlerClass}
       * The mocked file handler
       */
      createWritable() {
        return this;
      }

      /**
       * Write content to the mocked file
       * @param {string} content Content to be written
       */
      write(content) {
        this.content = 'added: ' + content;
      }

      /**
       * Mocked close behavior of Writable
       */
      close() {
        return;
      }
    }

    /**
     * This class is used to mock Stream
     */
    class MockStream {
      content = '';

      /**
       * Constructor
       * @param {string} content The content of the stream.
       */
      constructor(content) {
        this.content = content;
      }

      /**
     * Return a mocked reader object
     * @return {MockReader} A mocked reader object
     */
      getReader() {
        return new MockReader(this.content);
      }
    }

    /**
     * This class is used to mock Reader
     */
    class MockReader {
      content = '';

      /**
       * Constructor
       * @param {string} content
       * The content the reader could read.
       */
      constructor(content) {
        this.content = content;
      }

      /**
       * Return the encoded value of contents.
       * @return {dictionary} Encoded content value
       */
      read() {
        const encoder = new TextEncoder();
        const encodedContent = encoder.encode(this.content);
        return {value: encodedContent};
      }
    }
    const mockFSDirectryHandler =
      new MockFSDirectryHandlerClass('directory', 'test_folder', null);
    const file1 = new MockFSDirectryHandlerClass('file', 'test1.md', null);
    const file2 = new MockFSDirectryHandlerClass('file', 'test2.txt', null);
    const file3 = new MockFSDirectryHandlerClass('file', 'test3.js', null);
    mockFSDirectryHandler.setValues([file1, file2, file3]);
    window.showDirectoryPicker = async () => mockFSDirectryHandler;
    const mockFSFileHandler =
      new MockFSDirectryHandlerClass('file', 'test3.md', mockFSDirectryHandler);
    window.showSaveFilePicker = async (_opt) => mockFSFileHandler;
  });
});

test('Open Directory', async ({page}) => {
  await page.goto('./');
  await page.locator('#open-directory').click();
  await page.setViewportSize({width: 1600, height: 1200});
  await expect(page).toHaveScreenshot();
  await expect(page.getByRole('listitem')).toHaveCount(2);
});

test('Read File', async ({page}) => {
  await page.goto('./');
  await page.locator('#open-directory').click();
  await page.getByText('test1.md').click();
  await page.setViewportSize({width: 1600, height: 1200});
  await expect(page).toHaveScreenshot();

  await page.getByText('test2.txt').click();
  await expect(page).toHaveScreenshot();

  await page.getByText('test1.md').click();
  await expect(page).toHaveScreenshot();
});

test('Create New File', async ({page}) => {
  await page.goto('./');
  await page.locator('#open-directory').click();
  await page.locator('#new-file').click();
  await page.setViewportSize({width: 1600, height: 1200});
  await expect(page).toHaveScreenshot();
  await expect(page.getByRole('listitem')).toHaveCount(3);

  await page.getByText('test2.txt').click();
  await expect(page).toHaveScreenshot();

  await page.getByText('test3.md').click();
  await expect(page).toHaveScreenshot();
});

test('Save File', async ({page}) => {
  await page.goto('./');
  await page.locator('#open-directory').click();
  await page.getByText('test1.md').click();
  await page.locator('#save-file').click();
  await page.setViewportSize({width: 1600, height: 1200});
  await expect(page).toHaveScreenshot();
  await expect(page.getByRole('listitem')).toHaveCount(2);

  await page.getByText('test2.txt').click();
  await expect(page).toHaveScreenshot();

  await page.getByText('test1.md').click();
  await expect(page).toHaveScreenshot();
});

test('Search', async ({page}) => {
  await page.goto('./');
  await page.locator('#open-directory').click();
  await page.getByPlaceholder('Search').fill('1');
  await page.setViewportSize({width: 1600, height: 1200});
  await expect(page).toHaveScreenshot();
  await expect(page.getByRole('listitem')).toHaveCount(1);

  await page.locator('#new-file').click();
  await page.getByPlaceholder('Search').fill('3');
  await expect(page).toHaveScreenshot();
  await expect(page.getByRole('listitem')).toHaveCount(1);

  await page.getByPlaceholder('Search').fill('');
  await expect(page).toHaveScreenshot();
  await expect(page.getByRole('listitem')).toHaveCount(3);

  await page.getByText('test1.md').click();
  await page.locator('#save-file').click();
  await page.getByPlaceholder('Search').fill('added');
  await expect(page).toHaveScreenshot();
  await expect(page.getByRole('listitem')).toHaveCount(1);
});
