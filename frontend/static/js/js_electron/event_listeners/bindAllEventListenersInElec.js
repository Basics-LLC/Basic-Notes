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
  /**
 * Saves file to provided path
 * @param {string} filename Path of the file to save (including filename)
 */
  function saveFile(filename) {
    setActiveFile(filename);
    setCurrentFileName();
    getCurrentDirFiles();
  }
  /**
 * Opens file into the editor from the provided path
 * @param {string} filename Path of the file to save (including filename)
 */
  function openFile(filename) {
    setActiveFile(filename);
    setCurrentFileName();
    writeFileToTextArea();
    getCurrentDirFiles();
    getRecentFiles();
  }
  /**
 * Cancels the editing of files,
 * and restores intermediate variables to their defaults
 */
  function cancelFileEdit() {
    setActiveFile(undefined);
    noteTitle.value = '';
    simplemde.value('');
  }

  // Utililty Functions
  /**
 * Writes content of opened file to the text area
 */
  function writeFileToTextArea() {
    const currentFile = getActiveFile();
    if (validateFile(currentFile)) {
      const mdData = fs.readFileSync(getActiveFile()).toString();
      simplemde.value(mdData);
    }
  }

  /**
 * Checks if there is an active file, returns false if there isn't
 * @return {boolean} Is there an active file?
 */
  function isFileActive() {
    if (activeFile=== undefined || activeFile ==='') {
      return false;
    }
    return true;
  }
  /**
 * Gets the active file
 * @return {string} Path of active file
 */
  function getActiveFile() {
    return activeFile;
  }
  /**
 * Writes content of the textbox to the file path provided
 * @param {string} fname Path of the file to save (including filename)
 */
  function createFile(fname) {
    const content=simplemde.value();
    writeToFile(content, fname).then(function() {
      saveFile(fname);
    });
  }
  /**
 * Validates if given file is txt or markdown
 * @param {string} filename Path of the file to save (including filename)
 * @return {boolean} True if file is txt or md, else false
 */
  function validateFile(filename) {
    const ext = path.extname(filename);
    if (ext === '.md' || ext == '.txt') {
      return true;
    }
    return false;
  }
  /**
 * Sets the note title to the currently opened file
 */
  function setCurrentFileName() {
    const filename = getActiveFile();
    noteTitle.value = getFileName(filename);
  }
  /**
 * Opens the save file dialog to allow user to specify path of file to save
 * @param {string} df Default path to save file
 * @return {string} User selected path to save file
 */
  function openSaveDialog(df) {
    const file = dialog.showSaveDialog(
        {title: 'Save Note',
          defaultPath: df, properties: ['selectFile'],
          filters: [{name: 'Markdown file', extensions: ['md']}]});
    setActiveFile(file.filePath);
    return file;
  }

  /**
 * Opens the select file dialog to allow user to specify path of file to open
 */
  async function openSelectFileDialog() {
    const result = await dialog.showOpenDialog(
        {title: 'Open Note', properties: ['openFile']});
    const filename = result.filePaths[0];
    return filename;
  }
  /**
 * Formats the path to only retrive the note title
 * @param {string} fullPath Full path to file
 * @return {string} Parsed note title from path
 */
  function getFileName(fullPath) {
    if (fullPath !== undefined) {
      return fullPath.toString().replace(/^.*[\\\/]/, '');
    }
  }
  /**
 * Adds recent file entry to the recents database
 * @param {string} fileName Name of note to add to recents
 * @param {string} filePath Full path of note to add to recents
 */
  function addRecentFile(fileName, filePath) {
    if (!recentFileExists(fileName)) {
      db.get('files')
          .push({name: fileName, path: filePath})
          .write();
    }
  }
  /**
 * Sets active file to the file path provided, updates note title, and
 * adds file to recents
 * @param {string} filename Path of file to set as active
 */
  function setActiveFile(filename) {
    activeFile = filename;
    const name = getFileName(filename);
    if (filename !== undefined) {
      addRecentFile(name, filename);
    }
  }
  /**
 * Checks if given file exists in recent files db
 * @param {string} recentFileName Name of file to search in recents
 * @return {boolean} True if file exists, else false
 */
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
  /**
 * Populates the recent files list from the database
 */
  function getRecentFiles() {
    const files = db.get('files').value('files');
    const htmlView = createRecentFilesView(files);
    recentFiles.innerHTML = '';
    recentFiles.innerHTML = htmlView;
  }
  /**
 * Populates the cureent-dir files list
 */
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
  /**
 * Generates the recent files list html
 * @param {Array} data List of recent files retrieved from db
 * @return {string} Generated HTML of recent files view
 */
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
  /**
 * Generates the current-dir files list html
 * @param {Array} data List of current-dir files
 * @return {string} Generated HTML of current-dir files view
 */
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
    for (const name in data) { // eslint-disable-line
      const pathVal = data[name];
      output += addDataTotemplate(template, shortenText(name), pathVal );
    }
    return output;
  }
  /**
 * Generates an html from a template
 * @param {string} temp Input html template
 * @param {string} name Name of note
 * @param {string} path Path of note
 * @return {string} Generated HTML
 */
  function addDataTotemplate(temp, name, path) {
    temp = temp.replace('{name}', name);
    temp = temp.replace('{location}', path);
    return temp;
  }
  /**
 * Clears all the recent files db entries
 */
  function removeAllRecentFiles() {
    db.get('files')
        .remove().write();
  }
  /**
 * Shortens filename with greater than 15 characters
 * @param {string} string Name of file
 * @return {string} Shortened file name
 */
  function shortenText(string) {
    if (string.length > 15) {
      string = string.substring(0, 15)+'...';
    }
    return string;
  }

  /**
 * Writes file to disk
 * @param {string} text Text to write in file
 * @param {string} filePath Path of the file
 * @return {boolean} True if there are errors
 */
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
