export {filterCertainFormats};

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
