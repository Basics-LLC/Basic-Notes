export {filterCertainFormats, filterCertainKeyword};

/**
 * Filter files in the seletced directory to be displayed
 * @param {string} fileName The complete name of the file, extension included
 * @param  {array} allowedFormats The file formats allowed to be displaed
 * @return {boolean} whether the file falls into the allowed format
 */
function filterCertainFormats(fileName, allowedFormats) {
  const format = fileName.split('.').pop();
  return allowedFormats.includes(format);
}

/**
 * Search whether a keyword appears in a text
 * @param {string} text The target text
 * @param {string} keyword The keyword to be searched
 * @return {boolean} Whether the keyword appears in the text
 */
function filterCertainKeyword(text, keyword) {
  return text.includes(keyword);
}
