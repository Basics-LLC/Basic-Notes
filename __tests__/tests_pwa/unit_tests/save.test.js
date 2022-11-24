/**
 * @jest-environment jsdom
 */
import {saveFile} from
  '../../../frontend/static/js/js_pwa/text_handlers/save.js';
import {SimpleMDEMock} from '../../mocks/mocks.js';

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
