export {bindAllEventListeners};

import {cleanUp} from '../text_handlers/cleanUp.js';
import {openFileDialog, readFile} from '../text_handlers/upload.js';
import {saveFile} from '../text_handlers/save.js';
import {renderMarkdown} from '../text_handlers/markdown.js';
import 'https://cdn.jsdelivr.net/npm/marked/marked.min.js';
import 'https://cdn.jsdelivr.net/npm/dompurify@2.4.1/dist/purify.min.js';

const newFileId = 'new-file';
const uploadFileId = 'upload-file';
const saveFileId = 'save-file';
const renderId = 'render';
const titleId = 'title';
const textareaId = 'textarea';
const fileSelectorId = 'fileLoader';
const mainDivId = 'main';

const clickEvent = 'click';
const changeEvent = 'change';

/**
 * Bind an event listener based on given parameters.
 * All functions should be sync.
 * @param {string} elementId The id of the target element.
 * @param {string} event The target event name.
 * @param {function} func The callback function for the listener.
 * @param  {...any} funcParam Parameters for the callback function.
 */
function bindEventListener(elementId, event, func, ...funcParam) {
  document.getElementById(elementId).addEventListener(event, () => {
    func(...funcParam);
  }, false);
}

/**
 * Bind an event listener based on given parameters.
 * Functions could be async.
 * @param {string} elementId The id of the target element.
 * @param {string} event The target event name.
 * @param {function} func The callback function for the listener.
 * @param  {...any} funcParam Parameters for the callback function.
 */
function bindEventListenerAsync(elementId, event, func, ...funcParam) {
  document.getElementById(elementId).addEventListener(event, async () => {
    func(...funcParam);
  }, false);
}

/**
 * Bind all event listeners.
 */
function bindAllEventListeners() {
  bindEventListener(newFileId, clickEvent, cleanUp, [titleId, textareaId]);
  bindEventListener(uploadFileId, clickEvent, openFileDialog, fileSelectorId);
  bindEventListenerAsync(fileSelectorId, changeEvent, readFile,
      fileSelectorId, titleId, textareaId);
  bindEventListenerAsync(saveFileId, clickEvent, saveFile, titleId, textareaId);
  bindEventListener(renderId, clickEvent, renderMarkdown,
      textareaId, mainDivId, renderId, marked, DOMPurify);
}
