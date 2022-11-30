/**
 * Function to write the file
 * @param {Object} dHandel Directory where the file resides
 * @param {Object} flHandle File handle to write
 * @param {String} contents Contents of the file
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
 * @param {Object} flHandle handle of the file to read from
 * @return {String} the contents of the file as string
 */
async function readFromFile(flHandle) {
  reader = await flHandle.stream().getReader();
  data = await reader.read().then(console.log('READ DATA'));
  return new TextDecoder().decode(data.value);
  // run repopulate list function
}
