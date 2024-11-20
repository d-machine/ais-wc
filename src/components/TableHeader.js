import { html, css, LitElement } from 'lit';

class TableHeader extends LitElement {
  static styles = css`
    :host {
      display: table-cell;
      font-weight: bold;
      padding: 12px;
      border: 1px solid #ddd;
      text-align: left;
      background-color: #f4f4f4;
    }
  `;

  render() {
    return html`<slot></slot>`;
  }
}

customElements.define('table-header', TableHeader);
