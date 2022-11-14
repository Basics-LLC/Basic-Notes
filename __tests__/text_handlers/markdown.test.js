/**
 * @jest-environment jsdom
 */
import {marked} from 'marked';
import {renderMarkdown} from
  '../../frontend/static/js/js_pwa/text_handlers/markdown.js';

describe('Should render markdown from textarea correctly', () => {
  const textareaId = 'textarea';
  const mainDivId = 'main';
  const renderButtonId = 'render';
  const markdownDivId = 'markdown';

  test('Button value should be flipped', () => {
    document.body.innerHTML =
            '<div id="main">' +
            '  <input type="text" id="title" placeholder="Name of Note" />' +
            '  <button type="button" id="render">Markdown!</button>' +
            '  <textarea id="textarea"></textarea>' +
            '</div>';
    renderMarkdown(textareaId, mainDivId, renderButtonId, marked);
    expect(document.getElementById(renderButtonId).innerHTML).toBe('Raw Text');
    renderMarkdown(textareaId, mainDivId, renderButtonId, marked);
    expect(document.getElementById(renderButtonId).innerHTML).toBe('Markdown!');
  });

  test('Text should be correctly rendered', () => {
    document.body.innerHTML =
            '<div id="main">' +
            '  <input type="text" id="title" placeholder="Name of Note" />' +
            '  <button type="button" id="render">Markdown!</button>' +
            '  <textarea id="textarea"># Enter text here</textarea>' +
            '</div>';
    renderMarkdown(textareaId, mainDivId, renderButtonId, marked);
    expect(document.getElementById(markdownDivId).innerHTML)
        .toBe(marked.parse('# Enter text here'));
  });

  test('Button click should work as expcted', () => {
    document.body.innerHTML =
            '<div id="main">' +
            '  <input type="text" id="title" placeholder="Name of Note" />' +
            '  <button type="button" id="render">Markdown!</button>' +
            '  <textarea id="textarea"># Enter text here</textarea>' +
            '</div>';
    renderMarkdown(textareaId, mainDivId, renderButtonId, marked);
    expect(document.getElementById(textareaId).style.display).toBe('none');
    renderMarkdown(textareaId, mainDivId, renderButtonId, marked);
    expect(document.getElementById(textareaId).style.display).toBe('block');
  });
});
