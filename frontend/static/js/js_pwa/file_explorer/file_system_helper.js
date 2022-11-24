import {listFiles} from './list_files.js';
import {app} from '../index.js';

/**
 * Function to write the file
 * @param {*} dHandel Waiting for @Harshit to add
 * @param {*} flHandle Waiting for @Harshit to add
 * @param {*} contents Waiting for @Harshit to add
 * eslint-disable-line no-unused-vars
 */
async function writeToFile(dHandel, flHandle, contents) {
  const fileHandle = await dHandel.getFileHandle(flHandle.name);
  const writable = await fileHandle.createWritable();
  await writable.write(contents);
  await writable.close();
}

/**
 * Function to read the file
 * @param {*} flHandle Waiting for @Harshit to add
 * @return {*} Waiting for @Harshit to add
 */
async function readFromFile(flHandle) {
  reader = await flHandle.stream().getReader();
  data = await reader.read().then(console.log('READ DATA'));
  return new TextDecoder().decode(data.value);
  // run repopulate list function
}

/**
 * Function to create new file
 * @return {newHandle} file handle of the new file created
 */
async function createNewFile() {
  const newHandle = await window.showSaveFilePicker();
  listFiles(app.dir_handle);
  return newHandle;
}
