export {simplemde};
import {bindAllEventListeners} from
  './event_listeners/bindAllEventListeners.js';
import {SimpleMDEClass} from '../third_party/adapter.js';

const simplemde = new SimpleMDEClass();
bindAllEventListeners();
