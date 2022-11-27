export {saveFileFS, openFileFS, createNewFileFS};
import {listFiles} from './listFiles.js';
import {app} from '../index.js';
import {onFileReadListener} from '../text_handlers/upload.js';

/**
 * Function to write the file
 * @param {string} fileName The name of the file to be written
 * @param {string} contents The contents of the file to be written.
 * eslint-disable-line no-unused-vars
 */
async function writeToFile(fileName, contents) {
  const fileHandle = await app.dir_handle.getFileHandle(fileName);
  const writable = await fileHandle.createWritable();
  await writable.write(contents);
  await writable.close();
}

/**
 * Save the modification through file system directly to the local file.
 * @param {string} titleId The id of the title element
 * @param {Object} simplemde The editor
 */
async function saveFileFS(titleId, simplemde) {
  const fileName = document.getElementById(titleId).value;
  const contents = simplemde.getValue();
  writeToFile(fileName, contents);
}

/**
 * Function to read the file
 * @param {*} flHandle Waiting for @Harshit to add
 * @return {*} Waiting for @Harshit to add
 */
async function readFromFile(flHandle) {
  const reader = await flHandle.stream().getReader();
  const data = await reader.read().then(console.log('READ DATA'));
  return new TextDecoder().decode(data.value);
  // run repopulate list function
}

/**
 * Open the clicked file
 * @param {string} elementId The id of selected file element
 * @param {string} titleId The id of the title element
 * @param {Object} simplemde The editor object
 */
async function openFileFS(elementId, titleId, simplemde) {
  for (const flHandle of app.file_handles) {
    if (flHandle.name === elementId) {
      onFileReadListener(titleId, flHandle.name,
          await readFromFile(flHandle), simplemde);
      break;
    }
  }
}

/**
 * Function to create new file
 * @param {string} titleId The id of the title element
 * @param {Object} simplemde The editor
 * @return {newHandle} file handle of the new file created
 */
async function createNewFileFS(titleId, simplemde) {
  const opts = {
    excludeAcceptAllOption: true,
    types: [{
      description: 'Text file',
      accept: {'text/plain': ['.txt', '.md']},
    }],
  };
  const newHandle = await window.showSaveFilePicker(opts).catch(function(e) {
    if (e instanceof DOMException && e.name == 'AbortError') {
      return null;
    }
  });
  listFiles(app.dir_handle);
  const file = await newHandle.getFile();
  onFileReadListener(titleId, file.name, await readFromFile(file), simplemde);
  return newHandle;
}
