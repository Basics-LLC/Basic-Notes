/*
  * Function to write the file
 */
async function write_to_file(dHandel, flHandle, contents) {
    fileHandle = await dHandel.getFileHandle(flHandle.name);
    const writable = await fileHandle.createWritable();
    await writable.write(contents);
    await writable.close();
}

/*
  * Function to read the file
 */
async function read_from_file(flHandle) {
    
    reader = await flHandle.stream().getReader();
    data = await reader.read().then(console.log("READ DATA"));
    return new TextDecoder().decode(data.value);
    // run repopulate list function

}
