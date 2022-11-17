/**
 * @jest-environment jsdom
 */
import {saveFile} from
  '../../../frontend/static/js/js_pwa/text_handlers/save.js';

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
  value = () => {
    return this.content;
  };

  /**
   * Set the content of the editor.
   * @param {string} text to be written to the editor.
   */
  setValue = (text) => {
    this.content = text;
  };
}

describe('Construct and download file according to text', () => {
  window.URL.createObjectURL = jest.fn();
  test('Create file and bind to element', async () => {
    const simplemde = new SimpleMDEMock();
    simplemde.setValue('foo');
    const link = document.createElement('a');
    jest.spyOn(document, 'createElement').mockReturnValueOnce(link);
    document.body.innerHTML =
            '<div>' +
            '  <textarea id="testarea">Enter</textarea>' +
            '  <input type="text" id="testTitle" value="Name">' +
            '</div>';
    const file = await saveFile('testTitle', simplemde);
    expect(link.download).toBe('Name');
    expect(file.name).toBe('Name');
  });
});
