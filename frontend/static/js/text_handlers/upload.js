export {openFileDialog, readFile, onFileReadListener};

/**
 * Once this function has been called, it will simulate
 * the action of clicking the choose file button.
 * @param {string} elementId The id of the file upload button.
 */
function openFileDialog(elementId) {
  document.getElementById(elementId).click();
}

/**
 * Read the contents of the given file.
 * @param {File} file The file object to be read.
 * @return {Promise} A promise of file contents.
 */
async function readFileContent(file) {
  const reader = new FileReader();
  return new Promise((resolve, reject) => {
    reader.readAsText(file);
    reader.onerror = () => {
      reader.abort();
      reject(new DOMException('Problem parsing input file.'));
    };
    reader.onload = () => {
      resolve(reader.result);
    };
  });
}

/**
 * Read the name of the given file.
 * @param {File} file The file object to be read.
 * @return {string} The name of the file.
 */
function readFileName(file) {
  return file.name;
}

/**
 * Read the selected file.
 * @param {string} fileSelectorId The if of the file selector.
 * @param {string} titleId The id of the input element of title.
 * @param {string} textareaId The if of the textarea element.
 */
async function readFile(fileSelectorId, titleId, textareaId) {
  const file = document.getElementById(fileSelectorId).files[0];
  const title = readFileName(file);
  const text = await readFileContent(file);
  onFileReadListener([titleId, textareaId], [title, text]);
}

/**
 * Fill the value of element found by each given id
 * with each given content.
 * @param {list} ids The list of elements ids to be matched.
 * @param {list} contents The list of contents of relevant elements.
 */
function onFileReadListener(ids, contents) {
  if (ids.length !== contents.length) {
    throw new Error(
        'The length of id is different from the length of contents');
  }
  for (let i=0; i<ids.length; i++) {
    const id = ids[i];
    const content = contents[i];
    document.getElementById(id).value = content;
  }
}
