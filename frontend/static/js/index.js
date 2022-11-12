import {bindAllEventListeners} from
  './event_listeners/bindAllEventListeners.js';
import {isElectron} from './checkElectron.js';

if (!isElectron()) {
  bindAllEventListeners();
} else {
  require('./event_listeners/bindAllEventListenersInElec.js')();
}
