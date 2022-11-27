export {listFiles, addNewFile};
import {generateHandlerInfo} from './fileAccessHelper.js';
import {bindAllEventListenersForFS} from
  '../event_listeners/bindAllEventListeners.js';
import {app} from '../index.js';
import {filterCertainFormats} from './fileFilters.js';

const allowedFormats = ['md', 'txt'];

/**
 * Waiting for @Harshit to add
 * @param {*} dHandel Waiting for @Harshit to add
 */
async function listFiles(dHandel=null) {
  const listElement = document.getElementById('directory-files');
  listElement.innerHTML = '';
  const dirInfo = await generateHandlerInfo(dHandel);
  if (dirInfo == null) {
    return;
  }

  const itemIds = [];
  dirInfo.file_handles.forEach((fileHandleDir) => {
    if (!filterCertainFormats(fileHandleDir.name, allowedFormats)) {
      return;
    }
    itemIds.push(createListItem(fileHandleDir, listElement));
  });

  if (!app.dir_opened) {
    app.dir_opened = true;
    bindAllEventListenersForFS(itemIds, true);
  }
}

/**
 * Add a new file item to the directory and bind listener
 */
function addNewFile() {
  if (app.new_files.length === 0) {
    return;
  }
  const listElement = document.getElementById('directory-files');
  const itemIds = [];
  app.new_files.forEach((file) => {
    if (!filterCertainFormats(file.name, allowedFormats)) {
      return;
    }
    itemIds.push(createListItem(file, listElement));
    app.file_handles.push(file);
  });
  bindAllEventListenersForFS(itemIds, false);
  app.new_files = [];
}

/**
 * Create a new item element and append to the list element
 * @param {File} file The file object
 * @param {HTMLElement} listElement The list element in HTML
 * @return {string} The id of the created item element
 */
function createListItem(file, listElement) {
  const child = document.createElement('li');
  child.id = file.name;
  child.innerHTML = file.name;
  listElement.append(child);
  return child.id;
}
