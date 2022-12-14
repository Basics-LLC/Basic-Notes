module.exports = function(mainWindow) {
  const template = [
    {
      label: 'File',
      submenu: [
        {
          label: 'New File',
          click() {
            mainWindow.webContents.send('new-file');
          },
        },
        {
          label: 'Open File',
          click() {
            mainWindow.webContents.send('open-file');
          },
        },
        {
          type: 'separator',
        },
        {
          role: 'close',
        },
      ],
    },
    {
      label: 'Edit',
      submenu: [
        {
          role: 'undo',
        },
        {
          role: 'redo',
        },
        {
          type: 'separator',
        },
        {
          role: 'cut',
        },
        {
          role: 'copy',
        },
        {
          role: 'paste',
        },
      ],
    },

    {
      label: 'View',
      submenu: [
        {
          label: 'Clear Recents',
          click() {
            mainWindow.webContents.send('clear-recents', 'Hello World!');
          },
        },
        {
          role: 'reload',
        },
        {
          role: 'toggledevtools',
        },
        {
          type: 'separator',
        },
        {
          label: 'Toggle Recents',
          click() {
            mainWindow.webContents.send('toggle-recents', 'Hello World!');
          },
        },
        {
          type: 'separator',
        },
        {
          role: 'togglefullscreen',
        },
      ],
    },

    {
      role: 'window',
      submenu: [
        {
          role: 'minimize',
        },
        {
          role: 'close',
        },
      ],
    },
  ];

  return template;
};
