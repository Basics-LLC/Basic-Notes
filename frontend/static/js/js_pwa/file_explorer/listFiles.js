export {listFiles, addNewFile, searchFS};
import {generateHandlerInfo} from './fileAccessHelper.js';
import {bindAllEventListenersForFS} from
  '../event_listeners/bindAllEventListeners.js';
import {app} from '../index.js';
import {filterCertainFormats, filterCertainKeyword}
  from './fileFilters.js';
import {cleanUp} from '../text_handlers/cleanUp.js';
import {readFromFile} from './fileSystemHelper.js';

const allowedFormats = ['md', 'txt'];

/**
 * Waiting for @Harshit to add
 * @param {array} ids Ids of the element to be cleared
 * @param {Object} simplemde The editor object
 * @param {*} dHandel Waiting for @Harshit to add
 */
async function listFiles(ids, simplemde, dHandel=null) {
  const listElement = document.getElementById('directory-files');
  const dirInfo = await generateHandlerInfo(dHandel);
  if (dirInfo == null) {
    return;
  }

  listElement.innerHTML = '';
  const itemIds = [];
  dirInfo.file_handles.forEach((fileHandleDir) => {
    if (!filterCertainFormats(fileHandleDir.name, allowedFormats)) {
      return;
    }
    itemIds.push(createListItem(fileHandleDir, listElement));
  });

  cleanUp(ids, simplemde);

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

/**
 * Search by keyword among files
 * @param {Event} event Triggered input event
 */
function searchFS(event) {
  const keyword = event.currentTarget.value;
  app.file_handles.forEach(async (file) => {
    if (!filterCertainFormats(file.name, allowedFormats)) {
      return;
    }
    const text = await readFromFile(file);
    const id = file.name;
    if (!filterCertainKeyword(text, keyword)) {
      document.getElementById(id).style.display = 'none';
    } else {
      document.getElementById(id).style.display = 'list-item';
    }
  });
}
