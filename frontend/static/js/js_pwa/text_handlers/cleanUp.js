export {cleanUp};

/**
 * Clean up all the values of elements given by id.
 * @param {list} elementIds Ids of elements to be cleared.
 * @param {Object} simplemde The markdown editor object
 */
function cleanUp(elementIds, simplemde) {
  for (let i=0; i<elementIds.length; i++) {
    const id = elementIds[i];
    if (id === '') {
      continue;
    }
    document.getElementById(id).value = '';
  }
  simplemde.setValue('');
}
