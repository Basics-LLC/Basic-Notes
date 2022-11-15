const DISPLAYED = 'block';
const HIDDEN = 'none';
const markdownValue = 'Markdown!';
const rawTextValue = 'Raw Text';

/**
 * Change the display status of target dom element.
 * If element is visible, change it to invisable;
 * Or change it to visable.
 * @param {string} id The id of target dom element.
 * @return {HTMLElement} The target element.
 */
function flipContentStatus(id) {
  const contentElement = document.getElementById(id);
  const status = contentElement.style.display;
  if (status !== HIDDEN) {
    contentElement.style.display = HIDDEN;
  } else {
    contentElement.style.display = DISPLAYED;
  }
  return contentElement;
}

/**
 * Change the text of rendering button.
 * When markdown text is displayed, the text should be 'Raw Text'.
 * Or it should be 'Markdown!'.
 * @param {string} id The id of rendering button.
 * @param {HTMLElement} contentElement The textarea element.
 */
function flipButtonText(id, contentElement) {
  const buttonElement = document.getElementById(id);
  if (contentElement.style.display === DISPLAYED) {
    buttonElement.innerHTML = markdownValue;
  } else {
    buttonElement.innerHTML = rawTextValue;
  }
}

/**
 * If the raw text is display now, render it with markdown;
 * Or convert it back to raw text.
 * @param {string} id The of the textarea element.
 * @param {string} divId The id of the mian div. Should be 'main'.
 * @param {string} buttonId The id of the rendering button.
 * @param {Object} marked The object of markdown render.
 * @param {Object} DOMPurify The object to filter generated dom.
 */
function renderMarkdown(id, divId, buttonId, marked, DOMPurify) {
  const contentElement = flipContentStatus(id);
  flipButtonText(buttonId, contentElement);
  const mainDiv = document.getElementById(divId);
  if (contentElement.style.display === DISPLAYED) {
    mainDiv.removeChild(mainDiv.lastChild);
  } else {
    const text = contentElement.value;
    const parsedHTML = DOMPurify.sanitize(marked.parse(text));
    const div = document.createElement('div');
    div.setAttribute('id', 'markdown');
    div.innerHTML = parsedHTML;
    mainDiv.appendChild(div);
  }
}

module.exports = renderMarkdown;