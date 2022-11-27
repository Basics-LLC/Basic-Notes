/**
 * @jest-environment jsdom
 */
import {filterCertainFormats} from
  '../../../frontend/static/js/js_pwa/file_explorer/fileFilters.js';

describe('Filters should filter files in directories', () => {
  test('Test format filter', () => {
    const allowedFormats = ['md', 'txt'];
    expect(filterCertainFormats('test.js', allowedFormats)).toBe(false);
    expect(filterCertainFormats('test.md', allowedFormats)).toBe(true);
  });
});
