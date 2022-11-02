/**
 * @jest-environment jsdom
 */

import Note from '../../frontend/static/js/views/Note';

describe('Note view tests', () => {
  new Note('nothing');

  test('Note constructor test', () => {
    expect(document.title).toBe('Note');
  });
});
