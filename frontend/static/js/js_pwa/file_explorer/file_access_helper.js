// access the direcotry
// create the tree
// 
// active file handler object
// tree 

export {getFilesRecursively, dummy, generate_handler_info}

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

async function getAllFilesFromDirectoryHandle(directoryHandle) {
    let allFiles = [];
    for await (const fileHandleDir of getFilesRecursively(directoryHandle)) {
        allFiles.push(fileHandleDir);
    }
    return allFiles;
}
    
async function openFilePicker() {
    fileHandle = await window.showDirectoryPicker();
    return fileHandle
}
async function generate_handler_info() {
    const handle_info = {
        handle: null,
        file_handles: [],
    }
    handle_info.handle = await openFilePicker();
    handle_info.file_handles = await getAllFilesFromDirectoryHandle(handle_info.handle);
    return handle_info;
}

function dummy(k) {
    if (k==1) {return [];}
    return ["dummy_file.txt", "dummy_file_2.txt"];
}