/**
 * The abstract class for all views
 */
export default class {
  /**
   * @param {*} params Parameters passed in.
   */
  constructor(params) {
    this.params = params;
  }

  /**
   * @param {string} title The title of the view.
   */
  setTitle(title) {
    document.title = title;
  }

  /**
   * @return {string} Dom fraction.
   */
  async getHtml() {
    return '';
  }
}
