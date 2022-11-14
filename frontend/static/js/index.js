import {bindAllEventListeners} from
  './js_pwa/event_listeners/bindAllEventListeners.js';
import {isElectron} from './checkElectron.js';

if (!isElectron()) {
  bindAllEventListeners();
} else {
  require('./js_electron/event_listeners/bindAllEventListenersInElec')();
}
