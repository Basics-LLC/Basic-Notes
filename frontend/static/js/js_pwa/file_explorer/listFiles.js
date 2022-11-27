export {listFiles};
import {generateHandlerInfo} from './fileAccessHelper.js';
import {bindAllEventListenersForFS} from
  '../event_listeners/bindAllEventListeners.js';
import {app} from '../index.js';

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
    const child = document.createElement('li');
    child.id = fileHandleDir.name;
    child.innerHTML = fileHandleDir.name;
    listElement.append(child);
    itemIds.push(child.id);
  });

  if (!app.dir_opened) {
    app.dir_opened = true;
    bindAllEventListenersForFS(itemIds);
  }
}


/**
 * Filter files in the seletced directory to be displayed
 * @param {string} fileName The complete name of the file, extension included
 * @param  {array} allowedFormats The file formats allowed to be displaed
 * @return {boolean} whether the file falls into the allowed format
 */
function filterCertainFormats(fileName, allowedFormats) {
  const format = fileName.split('.').pop();
  return allowedFormats.includes(format);
}
