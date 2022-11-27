export {getFilesRecursively, generateHandlerInfo};
import {app} from '../index.js';

/**
 * Returns the files in the Directory Handle entry point
 * @param {number} pathDepth Current directory path depth, limit: 1
 * @param {*} entry Waiting for @Harshit to add
 */
async function* getFilesRecursively(pathDepth, entry) {
  if (entry.kind === 'file') {
    const file = await entry.getFile();
    if (file !== null) {
      yield file;
    }
  } else if (entry.kind === 'directory') {
    if (pathDepth > 1) {
      return;
    }
    for await (const handle of entry.values()) {
      yield* getFilesRecursively(pathDepth+1, handle);
    }
  }
}

/**
 * Returns the files in the Directory Handle
 * @param {*} directoryHandle Waiting for @Harshit to add
 * @return {*} Waiting for @Harshit to add
 */
async function getAllFilesFromDirectoryHandle(directoryHandle) {
  const allFiles = [];
  for await (const fileHandleDir of getFilesRecursively(1, directoryHandle)) {
    allFiles.push(fileHandleDir);
  }
  return allFiles;
}

/**
 * Opens the file picker and returns the selected directory handle
 * @return {*} Waiting for @Harshit to add
 */
async function openFilePicker() {
  const fileHandle = await window.showDirectoryPicker().catch(function(e) {
    if (e instanceof DOMException && e.name == 'AbortError') {
      return null;
    }
  });
  return fileHandle;
}

/**
 * generate the handler info for the app
 * @param {*} dHandel Waiting for @Harshit to add
 * @return {*} Waiting for @Harshit to add
 */
async function generateHandlerInfo(dHandel=null) {
  const handleInfo = {
    handle: null,
    file_handles: [],
  };
  if (!dHandel) {
    handleInfo.handle = await openFilePicker();
  } else {
    handleInfo.handle = dHandel;
  }
  if (handleInfo.handle == null) {
    return null;
  }
  handleInfo.file_handles =
    await getAllFilesFromDirectoryHandle(handleInfo.handle);
  app.dir_handle = handleInfo.handle;
  app.file_handles = handleInfo.file_handles;
  return handleInfo;
}
