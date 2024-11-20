import { html, css, LitElement } from 'lit';

class TableRow extends LitElement {
  static styles = css`
    :host {
      display: table-row;
    }
  `;

  render() {
    return html`<slot></slot>`;
  }
}

customElements.define('table-row', TableRow);
