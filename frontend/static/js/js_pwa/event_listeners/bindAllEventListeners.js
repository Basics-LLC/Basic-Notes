export {bindAllEventListeners, bindSingleFileOpenListenerAsync};

import {cleanUp} from '../text_handlers/cleanUp.js';
import {openFileDialog, readFile} from '../text_handlers/upload.js';
import {saveFile} from '../text_handlers/save.js';
import {listFiles} from '../file_explorer/listFiles.js';
import {openFile} from '../file_explorer/fileSystemHelper.js';
import {simplemde} from '../index.js';

const newFileId = 'new-file';
const uploadFileId = 'upload-file';
const saveFileId = 'save-file';
const openDirField = 'open-directory';
const titleId = 'title';
const fileSelectorId = 'fileLoader';

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
  bindEventListener(newFileId, clickEvent, cleanUp, [titleId], simplemde);
  bindEventListener(uploadFileId, clickEvent, openFileDialog, fileSelectorId);
  bindEventListenerAsync(fileSelectorId, changeEvent, readFile,
      fileSelectorId, titleId, simplemde);
  bindEventListenerAsync(saveFileId, clickEvent, saveFile, titleId, simplemde);
  bindEventListenerAsync(openDirField, clickEvent, listFiles, simplemde);
}

/**
 * Bind an event listener to the added li items of files
 * @param {string} elementId The id of the added li item
 * @param {Object} simplemde The editor object
 */
function bindSingleFileOpenListenerAsync(elementId, simplemde) {
  document.getElementById(elementId).addEventListener(clickEvent, async () => {
    openFile(elementId, titleId, simplemde);
  });
}
