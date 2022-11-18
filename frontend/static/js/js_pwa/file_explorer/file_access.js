// access the direcotry
// create the tree
// 
// active file handler object
// tree 

export {getFilesRecursively, getAllFilesFromDirectoryHandle}

async function* getFilesRecursively (entry) {
    if (entry.kind === 'file') {
        const file = await entry.getFile();
        if (file !== null) {
            file.relativePath = getRelativePath(entry);
            yield file;
        }
    } else if (entry.kind === 'directory') {
        for await (const handle of entry.values()) {
            yield* getFilesRecursively(handle);
        }
    }
}

function getAllFilesFromDirectoryHandle(directoryHandle) {
    allFiles = [];
    for await (const fileHandle of getFilesRecursively(directoryHandle)) {
        console.log(fileHandle);
        allFiles.push(fileHandle);
    }
    return allFiles;
}

function dummy() {
    return ["aa", "bb"];
}