export {simplemde, app};
import {bindAllEventListeners} from
  './event_listeners/bindAllEventListeners.js';
import {SimpleMDEClass} from '../third_party/adapter.js';

const app = {
  file_handles: [],
  active_file: null,
  dir_handle: null,
  new_files: [],
};

const simplemde = new SimpleMDEClass();
bindAllEventListeners();
