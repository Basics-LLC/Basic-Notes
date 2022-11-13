export {cleanUp};

/**
 * Clean up all the values of elements given by id.
 * @param {list} elementIds Ids of elements to be cleared.
 */
function cleanUp(elementIds) {
  for (let i=0; i<elementIds.length; i++) {
    const id = elementIds[i];
    if (id === '') {
      continue;
    }
    document.getElementById(id).value = '';
  }
}
