const express = require('express');
const path = require('path');

const app = express();

app.use('/frontend',
    express.static(path.resolve(__dirname, 'frontend')));

app.get('/index.html', (_req, res) => {
  res.sendFile(path.resolve('index.html'));
});

app.get('/*pwa_install', (_req, _res) => {
  // do nothing
});

app.get('/', (_req, res) => {
  res.sendFile(path.resolve('index.html'));
});

app.listen(process.env.PORT || 8080, () => console.log('Server running...'));
