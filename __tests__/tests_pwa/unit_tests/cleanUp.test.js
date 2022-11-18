/**
 * @jest-environment jsdom
 */
import {cleanUp}
  from '../../../frontend/static/js/js_pwa/text_handlers/cleanUp.js';

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

describe('The value of given elements should be cleared', () => {
  test('Input element value should be cleared', () => {
    const simplemde = new SimpleMDEMock();
    document.body.innerHTML =
            '<div>' +
            '  <input type="text" id="testTitle" value="Name">' +
            '  <input type="text" id="testTitle2" value="Name">' +
            '</div>';
    cleanUp(['testTitle', 'testTitle2'], simplemde);
    expect(document.getElementById('testTitle').value).toBe('');
    expect(document.getElementById('testTitle2').value).toBe('');
  });

  test('Editor and input element values should be cleared', () => {
    const simplemde = new SimpleMDEMock();
    document.body.innerHTML =
            '<div>' +
            '  <textarea id="testarea">Name</textarea>' +
            '  <input type="text" id="testTitle2" value="Name">' +
            '</div>';
    simplemde.value('test');
    cleanUp(['testTitle2'], simplemde);
    expect(document.getElementById('testTitle2').value).toBe('');
    expect(simplemde.getValue()).toBe('');
  });
});
