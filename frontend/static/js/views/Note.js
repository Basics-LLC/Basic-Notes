import AbstractView from './AbstractView.js';

/**
 * The Note view
 */
export default class extends AbstractView {
  /**
   * @param {*} params Parameters passed in.
   */
  constructor(params) {
    super(params);
    this.setTitle('Basics Notes');
  }

  /**
   * @return {string} Dom fraction of Note.
   */
  async getHtml() {
    return `
            <h1>Welcome back, Dom</h1>
            <p>Hi there, this is your Note.</p>
            <p>
                <a href="/link1" data-link>View recent posts</a>.
            </p>
        `;
  }
}
