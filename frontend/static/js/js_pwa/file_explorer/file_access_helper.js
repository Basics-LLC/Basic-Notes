export {getFilesRecursively, dummy, generate_handler_info}

/*
  * Returns the files in the Directory Handle entry point
 */
async function* getFilesRecursively (entry) {
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

/*
  * Returns the files in the Directory Handle
 */
async function getAllFilesFromDirectoryHandle(directoryHandle) {
    let allFiles = [];
    for await (const fileHandleDir of getFilesRecursively(directoryHandle)) {
        allFiles.push(fileHandleDir);
    }
    return allFiles;
}

/*
  * Opens the file picker and returns the selected directory handle
 */
async function openFilePicker() {
    fileHandle = await window.showDirectoryPicker();
    return fileHandle
}

/*
  * generate the handler info for the app
 */
async function generate_handler_info() {
    const handle_info = {
        handle: null,
        file_handles: [],
    }
    handle_info.handle = await openFilePicker();
    handle_info.file_handles = await getAllFilesFromDirectoryHandle(handle_info.handle);
    return await handle_info;
}