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
 * @param {Object} simplemde The markdown editor object.
 */
async function readFile(fileSelectorId, titleId, simplemde) {
  const file = document.getElementById(fileSelectorId).files[0];
  if (file == null) {
    return;
  }
  document.getElementById(fileSelectorId).value = null;
  const title = readFileName(file);
  const text = await readFileContent(file);
  onFileReadListener(titleId, title, text, simplemde);
}

/**
 * Fill the value of element found by each given id
 * with each given content.
 * @param {string} titleId The id of the title element
 * @param {string} title The title of the read file.
 * @param {string} contents The content of the read file.
 * @param {Object} simplemde The markdown editor object.
 */
function onFileReadListener(titleId, title, contents, simplemde) {
  document.getElementById(titleId).value = title;
  simplemde.setValue(contents);
}
