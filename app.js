import {isElectron} from './frontend/static/js/checkElectron.js';

if (!isElectron() && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker && navigator.serviceWorker.register('./serviceWorker.js');
  });
}
