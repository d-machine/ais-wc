import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { MenuItem } from "../menu/types";
import '../menu/main-menu-element';

@customElement('header-element')
export class HeaderElement extends LitElement {
  @property({ type: Array }) menuItems: MenuItem[] = [];
  @property({ type: String }) title = 'Web Components Demo';

  static styles = css`
    :host {
      display: block;
      width: 100%;
      position: fixed;
      top: 0;
      left: 0;
      z-index: 1000;
      background: white;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .header {
      display: flex;
      align-items: center;
      padding: 0 10px;
      height: 40px;
    }

    h1 {
      margin: 0;
      margin-left: 20px;
      font-size: 24px;
      color: #333;
      font-weight: 500;
    }

    .divider {
      flex-grow: 1;
    }

    .right-section {
      display: flex;
      align-items: center;
      gap: 20px;
    }
  `;

  render() {
    return html`
      <div class="header">
        <main-menu .menuItems="${this.menuItems}"></main-menu>
        <h1>${this.title}</h1>
        <div class="divider"></div>
        <div class="right-section">
          <slot name="right"></slot>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'header-element': HeaderElement;
  }
} 