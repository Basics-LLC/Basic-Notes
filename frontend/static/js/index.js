const { contextBridge, ipcRenderer } = require('electron');
const electron = require('electron')
const {dialog } = require('electron').remote;
const path = require('path');
const fs = require('fs');

//Element Declarations
let newFileBtn = document.getElementById("new-file");
let uploadFileBtn = document.getElementById("upload-file");
let saveFileBtn = document.getElementById("save-file");
var textContent = document.getElementById("textarea");
var noteTitle = document.getElementById("title");

var activeFile ="";

//Button Actions
saveFileBtn.addEventListener("click",() =>{
  var fname = "";
  var content=textContent.value;
  if(isFileActive()){
      fname = getActiveFile();
  }else{
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

uploadFileBtn.addEventListener("click",() =>{
  var filename = openSelectFileDialog();
  openFile(filename);
});

newFileBtn.addEventListener("click",() =>{
  cancelFileEdit();
  return false;
})



// Compound Functions

function saveFile(filename){
  setActiveFile(filename);
  setCurrentFileName();
  // showAlertBar(); //Notify about saved file
}

function openFile(filename){
  setActiveFile(filename);
  setCurrentFileName();
  writeFileToTextArea();
}

function cancelFileEdit(){
  setActiveFile(undefined);
  noteTitle.value = ""
  textContent.value = "";
}

// //Utililty Functions

function writeFileToTextArea(){
  var currentFile = getActiveFile();
  if(validateFile(currentFile)){
      var mdData = fs.readFileSync(getActiveFile()).toString();
      textContent.value = mdData;
  }
}


function isFileActive(){
  if(activeFile=== undefined || activeFile ===""){
      return false;
  }
  return true;
}

function getActiveFile(){
  return activeFile;
}

function createFile(fname){
  var content=textContent.value;
  writeToFile(content, fname).then(function(){
      saveFile(fname);
  });
}

function validateFile(filename){
  var ext = path.extname(filename);
  if(ext === ".md"){
      return true;
  }
  return false;
}

function setCurrentFileName(){
  var filename = getActiveFile();
  noteTitle.value = getFileName(filename);
}

function openSaveDialog(df){
  var filename= dialog.showSaveDialog(
      { defaultPath: df, properties: ['selectFile'] });
  setActiveFile(filename);
  return filename;
}


function openSelectFileDialog(){
  var files = dialog.showOpenDialog(
      { properties: ['openFile'] });
   var filename = files[0];
   return filename;
}

function getFileName(fullPath){
  if(fullPath !== undefined){
      return fullPath.toString().replace(/^.*[\\\/]/, '');
  }
}

function addRecentFile(fileName, filePath){
// ***STUB***
//TODO: Implement database to fetch recent files
}

function setActiveFile(filename){
  activeFile = filename;
  var name = getFileName(filename);
  if(filename !== undefined){
      addRecentFile(name, filename)
  }
}

async function writeToFile(text, filename){
  console.log(filename);
  if(filename!== undefined && validateFile(filename)){
      fs.writeFile(filename, text, function(err) {
          if(err) {
              return console.log(err);
          }
          return true;
      }); 
  }
}
