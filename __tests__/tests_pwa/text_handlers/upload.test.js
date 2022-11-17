/**
 * @jest-environment jsdom
 */
import {onFileReadListener} from
  '../../../frontend/static/js/js_pwa/text_handlers/upload.js';

/**
 * This class is used to mock SimpleMDE.
 */
class SimpleMDEMock {
  /**
   * Constructor
   */
  constructor() {
    this.content = '';
  };

  /**
   * return the editor content.
   * @return {string} content.
   */
  getValue = () => {
    return this.content;
  };

  /**
   * Set the content of the editor.
   * @param {string} text to be written to the editor.
   */
  value = (text) => {
    this.content = text;
  };
}

describe('The file contents should be properly processed', () => {
  test('Fill a regular file', async () => {
    const simplemde = new SimpleMDEMock();
    document.body.innerHTML =
            '<div>' +
            '  <textarea id="testarea">Enter</textarea>' +
            '  <input type="text" id="testTitle" value="Name">' +
            '</div>';
    onFileReadListener('testTitle', 'foo.txt', 'foo', simplemde);
    expect(document.getElementById('testTitle').value).toBe('foo.txt');
    expect(simplemde.getValue()).toBe('foo');
  });
});
