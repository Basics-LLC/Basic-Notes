const express = require('express');
const path = require('path');

const app = express();

app.use('/frontend',
    express.static(path.resolve(__dirname, 'frontend')));

app.get('/serviceWorker.js', (_req, res) => {
  res.sendFile(path.resolve('serviceWorker.js'));
});

app.get('/favicon.ico', (_req, res) => {
  res.sendFile(path.resolve('favicon.ico'));
});

app.get('/pwa_register.js', (_req, res) => {
  res.sendFile(path.resolve('pwa_register.js'));
});

app.get('/manifest.json', (_req, res) => {
  res.sendFile(path.resolve('manifest.json'));
});

app.get('/*', (_req, res) => {
  res.sendFile(path.resolve('index.html'));
});

app.listen(process.env.PORT || 8080, () => console.log('Server running...'));
