/**
 * @jest-environment jsdom
 */
import {cleanUp} from
  '../../frontend/static/js/js_pwa/text_handlers/cleanUp.js';

describe('The value of given elements should be cleared', () => {
  test('Input element value should be cleared', () => {
    document.body.innerHTML =
            '<div>' +
            '  <input type="text" id="testTitle" value="Name">' +
            '  <input type="text" id="testTitle2" value="Name">' +
            '</div>';
    cleanUp(['testTitle', 'testTitle2']);
    expect(document.getElementById('testTitle').value).toBe('');
    expect(document.getElementById('testTitle2').value).toBe('');
  });

  test('Textarea element value should be cleared', () => {
    document.body.innerHTML =
            '<div>' +
            '  <textarea id="testarea">Enter</textarea>' +
            '  <textarea id="testarea2">Here</textarea>' +
            '</div>';
    cleanUp(['testarea', 'testarea2']);
    expect(document.getElementById('testarea').value).toBe('');
    expect(document.getElementById('testarea2').value).toBe('');
  });

  test('Textarea and input element values should be cleared', () => {
    document.body.innerHTML =
            '<div>' +
            '  <textarea id="testarea">Name</textarea>' +
            '  <input type="text" id="testTitle2" value="Name">' +
            '</div>';
    cleanUp(['testarea', 'testTitle2']);
    expect(document.getElementById('testarea').value).toBe('');
    expect(document.getElementById('testTitle2').value).toBe('');
  });
});
