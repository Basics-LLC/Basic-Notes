import {generateHandlerInfo} from './file_access_helper.js';

/**
 * Waiting for @Harshit to add
 */
async function listFiles(dHandel=null) {
  const listElement = document.getElementById('directory-files');
  listElement.innerHTML = "";
  dirInfo = await generateHandlerInfo(dHandel);

  dirInfo.file_handles.forEach((fileHandleDir) => {
    const child = document.createElement('li');
    child.innerHTML = fileHandleDir.name;
    listElement.append(child);
  });
}
