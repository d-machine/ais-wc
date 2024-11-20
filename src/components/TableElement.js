
import { html, css, LitElement } from 'lit';
import './TableCell.js';
import './TableRow.js';
import './TableRow.js';

class TableElement extends LitElement {
  static styles = css`
    :host {
      display: table;
      width: 100%;
      border-collapse: separate;
      border-spacing: 0;
    }
    thead {
      position: sticky;
      top: 0;
      z-index: 1;
      background-color: white;
    }
    tbody tr:hover {
      background-color: #f5f5f5;
    }
  `;

  render() {
    return html`<slot></slot>`;
  }
}

customElements.define('table-element', TableElement);
