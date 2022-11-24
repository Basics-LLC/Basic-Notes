export {SimpleMDEMock};

/**
 * This class is used to mock SimpleMDE.
 */
class SimpleMDEMock {
  /**
     * Constructor
     */
  constructor() {
    this.content = '';
  };

  /**
     * return the editor content.
     * @return {string} content.
     */
  getValue = () => {
    return this.content;
  };

  /**
     * Set the content of the editor.
     * @param {string} text to be written to the editor.
     */
  setValue = (text) => {
    this.content = text;
  };
}
