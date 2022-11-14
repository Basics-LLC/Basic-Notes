/**
 * @jest-environment jsdom
 */
import {saveFile} from '../../frontend/static/js/js_pwa/text_handlers/save.js';

describe('Construct and download file according to text', () => {
  window.URL.createObjectURL = jest.fn();
  test('Create file and bind to element', async () => {
    const link = document.createElement('a');
    jest.spyOn(document, 'createElement').mockReturnValueOnce(link);
    document.body.innerHTML =
            '<div>' +
            '  <textarea id="testarea" value="Enter"></textarea>' +
            '  <input type="text" id="testTitle" value="Name">' +
            '</div>';
    await saveFile('testTitle', 'testarea');
    expect(link.download).toBe('Name');
  });
});
