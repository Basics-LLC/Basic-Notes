const {contextBridge, ipcRenderer} = require('electron');
const electron = require('electron');
const remote = require('@electron/remote');
const {dialog} = remote;
const path = require('path');
const fs = require('fs');
const renderMarkdown = require('../text_handlers/markdown');
const marked = require('marked');
const DOMPurify = require('dompurify');
const SimpleMDEClass = require('../../third_party/simplemde');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('basics_db.json');
const db = low(adapter);

db.defaults({files: [], count: 0})
    .write();


// frontend\static\js\js_electron\text_handlers\markdown.js
/**
 * Bind all event listeners in Electron app
 */
function bindAllEventListenersInElec() {
  // Element Declarations
  const newFileBtn = document.getElementById('new-file');
  const uploadFileBtn = document.getElementById('upload-file');
  const saveFileBtn = document.getElementById('save-file');
  const simplemde = new SimpleMDEClass(
      {
        element: document.getElementById('textarea'),
      },
  );
  const noteTitle = document.getElementById('title');
  const recentFiles = document.getElementById('recent-files');
  const currDirFiles = document.getElementById('directory-files');


  let activeFile ='';
  getRecentFiles();

  // Button Actions
  saveFileBtn.addEventListener('click', async () =>{
    let fname = '';
    const content=simplemde.value();
    if (isFileActive()) {
      fname = getActiveFile();
    } else {
      const fileName = noteTitle.value;
      console.log(fileName);
      const file = await openSaveDialog(fileName);
      if (file.canceled) {
        return false;
      }
      fname = file.filePath;
    }
    createFile(fname);
    return false;
  });


  electron.ipcRenderer.on('open-file', async (event, arg) => {
    const filename = await openSelectFileDialog();
    openFile(filename);
    getCurrentDirFiles();
    getRecentFiles();
  });

  electron.ipcRenderer.on('new-file', (event, arg) => {
    cancelFileEdit();
  });

  electron.ipcRenderer.on('clear-recents', (event, arg) => {
    removeAllRecentFiles();
    getRecentFiles();
  });

  uploadFileBtn.addEventListener('click', async () =>{
    const filename = await openSelectFileDialog();
    openFile(filename);
    getCurrentDirFiles();
    getRecentFiles();
  });

  newFileBtn.addEventListener('click', () =>{
    cancelFileEdit();
    return false;
  });

  document.getElementById('wrapper').addEventListener('click', function(e) {
    if (e.target.classList.contains('recent-file')) {
      const el = e.target;
      const path = el.getAttribute('data-path');
      openFile(path);
      return false;
    } else if (e.target.classList.contains('curr-dir-file')) {
      const el = e.target;
      const path = el.getAttribute('data-path');
      console.log(path);
      openFile(path);
      return false;
    }
  });

  // Compound Functions

  function saveFile(filename) {
    setActiveFile(filename);
    setCurrentFileName();
    getCurrentDirFiles();
    // showAlertBar(); //Notify about saved file
  }

  function openFile(filename) {
    setActiveFile(filename);
    setCurrentFileName();
    writeFileToTextArea();
    getCurrentDirFiles();
    getRecentFiles();
  }

  function cancelFileEdit() {
    setActiveFile(undefined);
    noteTitle.value = '';
    simplemde.value('');
  }

  // //Utililty Functions

  function writeFileToTextArea() {
    const currentFile = getActiveFile();
    if (validateFile(currentFile)) {
      const mdData = fs.readFileSync(getActiveFile()).toString();
      simplemde.value(mdData);
    }
  }


  function isFileActive() {
    if (activeFile=== undefined || activeFile ==='') {
      return false;
    }
    return true;
  }

  function getActiveFile() {
    return activeFile;
  }

  function createFile(fname) {
    const content=simplemde.value();
    writeToFile(content, fname).then(function() {
      saveFile(fname);
    });
  }

  function validateFile(filename) {
    const ext = path.extname(filename);
    if (ext === '.md' || ext == '.txt') {
      return true;
    }
    return false;
  }

  function setCurrentFileName() {
    const filename = getActiveFile();
    noteTitle.value = getFileName(filename);
  }

  function openSaveDialog(df) {
    const file = dialog.showSaveDialog(
        {title: 'Save Note',
          defaultPath: df, properties: ['selectFile'],
          filters: [{name: 'Markdown file', extensions: ['md']}]});
    setActiveFile(file.filePath);
    return file;
  }


  async function openSelectFileDialog() {
    const result = await dialog.showOpenDialog(
        {title: 'Open Note', properties: ['openFile']});
    const filename = result.filePaths[0];
    return filename;
  }

  function getFileName(fullPath) {
    if (fullPath !== undefined) {
      return fullPath.toString().replace(/^.*[\\\/]/, '');
    }
  }

  function addRecentFile(fileName, filePath) {
    if (!recentFileExists(fileName)) {
      db.get('files')
          .push({name: fileName, path: filePath})
          .write();
    }
  }

  function setActiveFile(filename) {
    activeFile = filename;
    const name = getFileName(filename);
    if (filename !== undefined) {
      addRecentFile(name, filename);
    }
  }

  function recentFileExists(recentFileName) {
    const count = db.get('files')
        .find({name: recentFileName})
        .size()
        .value();
    if (count > 0 ) {
      return true;
    }
    return false;
  }

  function getRecentFiles() {
    const files = db.get('files').value('files');
    const htmlView = createRecentFilesView(files);
    recentFiles.innerHTML = '';
    recentFiles.innerHTML = htmlView;
  }

  function getCurrentDirFiles() {
    if (isFileActive()) {
      const filename = getActiveFile();
      const dirPath = path.dirname(filename);
      const filePaths = {};
      fs.readdir(dirPath, (err, files) => {
        for (let i = 0; i < files.length; i++) {
          const fp = files[i];
          if (fp.split('.').pop() == 'md' || fp.split('.').pop() == 'txt') {
            filePaths[fp] = dirPath + '\\' + fp;
          }
        }
        const htmlView = createCurrentDirFilesView(filePaths);
        currDirFiles.innerHTML = '';
        currDirFiles.innerHTML = htmlView;
      });
    }
  }

  function createRecentFilesView(data) {
    const template = `
    <li>
      <a class="recent-file" data-path="{location}" href="javascript:void(0)">
        {name}
      </a>
    </li>`;
    let output =`
    <li class="sidebar-brand">
      <b>Recent Files</b>
      </a>
    </li>`;
    for (let i = 0; i < data.length; i++) {
      const obj = data[i];
      output += addDataTotemplate(template, shortenText(obj.name), obj.path );
    }
    return output;
  }

  function createCurrentDirFilesView(data) {
    const template = `
    <li>
        <a 
            class="curr-dir-file" 
            data-path="{location}" 
            href="javascript:void(0)">
                {name}
        </a>
    </li>`;
    let output =`<li class="sidebar-brand">
      <b>Files</b>
      </a></li>`;
    for (const name in data) {
      const pathVal = data[name];
      output += addDataTotemplate(template, shortenText(name), pathVal );
    }
    return output;
  }

  function addDataTotemplate(temp, name, locale) {
    temp = temp.replace('{name}', name);
    temp = temp.replace('{location}', locale);
    return temp;
  }

  function removeAllRecentFiles() {
    db.get('files')
        .remove().write();
  }

  function shortenText(string) {
    if (string.length > 15) {
      string = string.substring(0, 15)+'...';
    }
    return string;
  }


  async function writeToFile(text, filePath) {
    if (filePath!== undefined && validateFile(filePath)) {
      fs.writeFile(filePath, text, function(err) {
        if (err) {
          return console.log(err);
        }
        return true;
      });
    }
  }
}
module.exports = bindAllEventListenersInElec;
