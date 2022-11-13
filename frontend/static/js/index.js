const { contextBridge, ipcRenderer } = require('electron');
const electron = require('electron')
const { dialog } = require('electron').remote;
const path = require('path');
const fs = require('fs');

//Element Declarations
let newFileBtn = document.getElementById("new-file");
let uploadFileBtn = document.getElementById("upload-file");
let saveFileBtn = document.getElementById("save-file");
var textContent = document.getElementById("textarea");
var noteTitle = document.getElementById("title");

var activeFile = "";

//Button Actions
saveFileBtn.addEventListener("click", () => {
  var fname = "";
  var content = textContent.value;
  if (isFileActive()) {
    fname = getActiveFile();
  } else {
    fname = openSaveDialog("");
  }
  createFile(fname);
  return false;
});

electron.ipcRenderer.on('open-file', (event, arg) => {
  var filename = openSelectFileDialog();
  openFile(filename);

});

electron.ipcRenderer.on('new-file', (event, arg) => {
  cancelFileEdit();
});

uploadFileBtn.addEventListener("click", () => {
  var filename = openSelectFileDialog();
  openFile(filename);
});

newFileBtn.addEventListener("click", () => {
  cancelFileEdit();
  return false;
})



// Compound Functions
/**
 * Save the file
 * @param {string} filename 
 */
function saveFile(filename) {
  setActiveFile(filename);
  setCurrentFileName();
  // showAlertBar(); //Notify about saved file
}

/**
 * open the file
 * @param {string} filename 
 */
function openFile(filename) {
  setActiveFile(filename);
  setCurrentFileName();
  writeFileToTextArea();
}

/**
 * cancel the file edit
 */
function cancelFileEdit() {
  setActiveFile(undefined);
  noteTitle.value = ""
  textContent.value = "";
}

// //Utililty Functions
/**
 * Read the file and write it to text area
 */
function writeFileToTextArea() {
  var currentFile = getActiveFile();
  if (validateFile(currentFile)) {
    var mdData = fs.readFileSync(getActiveFile()).toString();
    textContent.value = mdData;
  }
}

/**
 * check if the file is active
 * @returns {boolean} - to check if the file is active
 */
function isFileActive() {
  if (activeFile === undefined || activeFile === "") {
    return false;
  }
  return true;
}
/**
 * Get the active file
 * @returns {string} activeFile
 */
function getActiveFile() {
  return activeFile;
}
/**
 * create and write the file
 * @param {any} fname - should be a string
 */
function createFile(fname) {
  var content = textContent.value;
  writeToFile(content, fname).then(function () {
    saveFile(fname);
  });
}
/**
 * validate the type of the file
 * @param {string} filename 
 * @returns {boolean} - True if the file is validated. Otherwise, False
 */
function validateFile(filename) {
  var ext = path.extname(filename);
  if (ext === ".md") {
    return true;
  }
  return false;
}
/**
 * set the current file name
 */
function setCurrentFileName() {
  var filename = getActiveFile();
  noteTitle.value = getFileName(filename);
}
/**
 * save the file
 * @param {string} df 
 * @returns {string} - File's name
 */
function openSaveDialog(df) {
  var filename = dialog.showSaveDialog(
    { defaultPath: df, properties: ['selectFile'] });
  setActiveFile(filename);
  return filename;
}

/**
 * Open the selected file dialog
 * @returns {string} - File's name
 */
function openSelectFileDialog() {
  var files = dialog.showOpenDialog(
    { properties: ['openFile'] });
  var filename = files[0];
  return filename;
}
/**
 * Get the file's name if it is defined
 * @param {string} fullPath - path to the file
 * @returns {string} - path to the file
 */
function getFileName(fullPath) {
  if (fullPath !== undefined) {
    return fullPath.toString().replace(/^.*[\\\/]/, '');
  }
}

function addRecentFile(fileName, filePath) {
  // ***STUB***
  //TODO: Implement database to fetch recent files
}
/**
 * set active file name if the file name is defined
 * @param {string} filename 
 */
function setActiveFile(filename) {
  activeFile = filename;
  var name = getFileName(filename);
  if (filename !== undefined) {
    addRecentFile(name, filename)
  }
}
/**
 * Asynchronous function to wirte the text to file
 * @param {string} text - words to save
 * @param {string} filename - file's name
 */
async function writeToFile(text, filename) {
  console.log(filename);
  if (filename !== undefined && validateFile(filename)) {
    fs.writeFile(filename, text, function (err) {
      if (err) {
        return console.log(err);
      }
      return true;
    });
  }
}
