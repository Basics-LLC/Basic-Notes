export {getFilesRecursively, generateHandlerInfo};

/**
 * Returns the files in the Directory Handle entry point
 * @param {*} entry Waiting for @Harshit to add
 */
async function* getFilesRecursively(entry) {
  if (entry.kind === 'file') {
    const file = await entry.getFile();
    if (file !== null) {
      // file.relativePath = getRelativePath(entry);
      yield file;
    }
  } else if (entry.kind === 'directory') {
    for await (const handle of entry.values()) {
      yield* getFilesRecursively(handle);
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
  for await (const fileHandleDir of getFilesRecursively(directoryHandle)) {
    allFiles.push(fileHandleDir);
  }
  return allFiles;
}

/**
 * Opens the file picker and returns the selected directory handle
 * @return {*} Waiting for @Harshit to add
 */
async function openFilePicker() {
  fileHandle = await window.showDirectoryPicker();
  return fileHandle;
}

/**
 * generate the handler info for the app
 * @return {*} Waiting for @Harshit to add
 */
async function generateHandlerInfo() {
  const handleInfo = {
    handle: null,
    file_handles: [],
  };
  handleInfo.handle = await openFilePicker();
  handleInfo.file_handles =
    await getAllFilesFromDirectoryHandle(handleInfo.handle);
  return await handleInfo;
}
