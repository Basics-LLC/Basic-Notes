export {SimpleMDEClass};
import './simplemde.js';

class SimpleMDEClass {
    constructor() {
        this.editor = new SimpleMDE();
    }

    getValue() {
        return this.editor.value();
    }

    setValue(content) {
        this.editor.value(content);
    }
}