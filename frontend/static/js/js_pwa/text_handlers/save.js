export {saveFile};

/**
 * Construct the file according to title and content.
 * @param {string} title The title of the file.
 * @param {string} text The content of the file.
 * @return {File} The generated File object.
 */
function constructFile(title, text) {
  const file = new File([text], title, {type: 'text/plain'});
  return file;
}

/**
 * Save a file accoding to the current file name and content.
 * @param {string} titleId The id of the title element.
 * @param {Object} simplemde The markdown editor object.
 */
async function saveFile(titleId, simplemde) {
  let title = document.getElementById(titleId).value;
  if (title === '') {
    title = 'new-file.md';
  }
  const text = simplemde.value();
  const link = document.createElement('a');
  link.download = title;
  const file = constructFile(title, text);
  link.href = window.URL.createObjectURL(file);
  link.click();
  return file;
}
