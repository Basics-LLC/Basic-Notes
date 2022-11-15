const {contextBridge, ipcRenderer} = require('electron');
const electron = require('electron');
const {dialog} = require('electron').remote;
const path = require('path');
const fs = require('fs');
const renderMarkdown = require('../text_handlers/markdown');
const marked = require('marked')
const DOMPurify = require('dompurify')


//frontend\static\js\js_electron\text_handlers\markdown.js
/**
 * Bind all event listeners in Electron app
 */
function bindAllEventListenersInElec() {
  // Element Declarations
  const newFileBtn = document.getElementById('new-file');
  const uploadFileBtn = document.getElementById('upload-file');
  const saveFileBtn = document.getElementById('save-file');
  const textContent = document.getElementById('textarea');
  const noteTitle = document.getElementById('title');
  const renderMarkdownBtn = document.getElementById('render');

  var activeFile ='';

  // Button Actions
  saveFileBtn.addEventListener('click', () =>{
    let fname = '';
    const content=textContent.value;
    if (isFileActive()) {
      fname = getActiveFile();
    } else {
      fname = openSaveDialog('');
    }
    createFile(fname);
    return false;
  });

  renderMarkdownBtn.addEventListener('click', () =>{
    renderMarkdown('textarea','main','render',marked,DOMPurify)
  });

  electron.ipcRenderer.on('open-file', (event, arg) => {
    const filename = openSelectFileDialog();
    openFile(filename);
  });

  electron.ipcRenderer.on('new-file', (event, arg) => {
    cancelFileEdit();
  });

  uploadFileBtn.addEventListener('click', () =>{
    const filename = openSelectFileDialog();
    openFile(filename);
  });

  newFileBtn.addEventListener('click', () =>{
    cancelFileEdit();
    return false;
  });


  // Compound Functions

  function saveFile(filename) {
    setActiveFile(filename);
    setCurrentFileName();
    // showAlertBar(); //Notify about saved file
  }

  function openFile(filename) {
    setActiveFile(filename);
    setCurrentFileName();
    writeFileToTextArea();
  }

  function cancelFileEdit() {
    setActiveFile(undefined);
    noteTitle.value = '';
    textContent.value = '';
  }

  // //Utililty Functions

  function writeFileToTextArea() {
    const currentFile = getActiveFile();
    if (validateFile(currentFile)) {
      const mdData = fs.readFileSync(getActiveFile()).toString();
      textContent.value = mdData;
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
    const content=textContent.value;
    writeToFile(content, fname).then(function() {
      saveFile(fname);
    });
  }

  function validateFile(filename) {
    const ext = path.extname(filename);
    if (ext === '.md') {
      return true;
    }
    return false;
  }

  function setCurrentFileName() {
    const filename = getActiveFile();
    noteTitle.value = getFileName(filename);
  }

  function openSaveDialog(df) {
    const filename= dialog.showSaveDialog(
        {defaultPath: df, properties: ['selectFile']});
    setActiveFile(filename);
    return filename;
  }


  function openSelectFileDialog() {
    const files = dialog.showOpenDialog(
        {properties: ['openFile']});
    const filename = files[0];
    return filename;
  }

  function getFileName(fullPath) {
    if (fullPath !== undefined) {
      return fullPath.toString().replace(/^.*[\\\/]/, '');
    }
  }

  function addRecentFile(fileName, filePath) {
    // ***STUB***
    // TODO: Implement database to fetch recent files
  }

  function setActiveFile(filename) {
    activeFile = filename;
    const name = getFileName(filename);
    if (filename !== undefined) {
      addRecentFile(name, filename);
    }
  }

  async function writeToFile(text, filename) {
    console.log(filename);
    if (filename!== undefined && validateFile(filename)) {
      fs.writeFile(filename, text, function(err) {
        if (err) {
          return console.log(err);
        }
        return true;
      });
    }
  }
}
module.exports = bindAllEventListenersInElec;
