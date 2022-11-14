/**
 * @jest-environment jsdom
 */
import {onFileReadListener} from
  '../../../frontend/static/js/js_pwa/text_handlers/upload.js';

describe('The file contents should be properly processed', () => {
  test('Fill a regular file', async () => {
    document.body.innerHTML =
            '<div>' +
            '  <textarea id="testarea" value="Enter"></textarea>' +
            '  <input type="text" id="testTitle" value="Name">' +
            '</div>';
    onFileReadListener(['testTitle', 'testarea'], ['foo.txt', 'foo']);
    expect(document.getElementById('testTitle').value).toBe('foo.txt');
    expect(document.getElementById('testarea').value).toBe('foo');
  });

  test('Should throw an error when invalid parameter', () => {
    const t = () => {
      onFileReadListener(['test'], []);
    };
    expect(t)
        .toThrow('The length of id is different from the length of contents');
  });
});
