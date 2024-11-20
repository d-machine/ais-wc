import { html, css, LitElement } from 'lit';

class TableCell extends LitElement {
  static styles = css`
    :host {
      display: table-cell;
      padding: 12px;
      border: 1px solid #ddd;
      text-align: left;
    }
  `;

  render() {
    return html`<slot></slot>`;
  }
}

customElements.define('table-cell', TableCell);
