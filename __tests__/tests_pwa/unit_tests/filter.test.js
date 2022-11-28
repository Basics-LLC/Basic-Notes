/**
 * @jest-environment jsdom
 */
import {filterCertainFormats, filterCertainKeyword} from
  '../../../frontend/static/js/js_pwa/file_explorer/fileFilters.js';

describe('Filters should filter files in directories', () => {
  test('Test format filter', () => {
    const allowedFormats = ['md', 'txt'];
    expect(filterCertainFormats('test.js', allowedFormats)).toBe(false);
    expect(filterCertainFormats('test.md', allowedFormats)).toBe(true);
  });

  test('Test text searvh filter', () => {
    const text = 'hello, world!';
    const keyword1 = 'wor';
    const keyword2 = 'lld';
    expect(filterCertainKeyword(text, keyword1)).toBe(true);
    expect(filterCertainKeyword(text, keyword2)).toBe(false);
  });
});
