import {generateHandlerInfo} from './file_access_helper.js';

/**
 * Waiting for @Harshit to add
 */
async function listFiles() {
  const listElement = document.getElementById('directory-files');
  dirInfo = await generateHandlerInfo();

  dirInfo.file_handles.forEach((fileHandleDir) => {
    const child = document.createElement('li');
    child.innerHTML = fileHandleDir.name;
    listElement.append(child);
  });
}
