import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { MenuItem } from "./types";
import "./menu-list-element";

@customElement('main-menu')
export class MainMenuElement extends LitElement {
  @property({ type: Array }) menuItems: MenuItem[] = [];
  @property({ type: Boolean }) open = false;

  static styles = css`
    :host {
      display: block;
      position: relative;
      font-size: 13px;
    }

    .menu-button {
      cursor: pointer;
      display: block;
      position: relative;
      width: 30px;
      height: 30px;
      background: none;
      border: none;
      padding: 0;
      z-index: 1000;
    }

    .bar {
      width: 30px;
      height: 3px;
      background-color: #333;
      position: absolute;
      border-radius: 3px;
      left: 0;
      transition: transform 0.3s ease, opacity 0.3s ease;
    }

    .bar:nth-child(1) { top: 6px; }
    .bar:nth-child(2) { top: 14px; }
    .bar:nth-child(3) { top: 22px; }

    .menu-button.open .bar:nth-child(1) {
      transform: translateY(8px) rotate(45deg);
    }

    .menu-button.open .bar:nth-child(2) {
      opacity: 0;
    }

    .menu-button.open .bar:nth-child(3) {
      transform: translateY(-8px) rotate(-45deg);
    }

    .menu-container {
      position: absolute;
      top: 35px;
      left: -10px;
      z-index: 999;
    }
  `;

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('menu-item-selected', this.handleMenuItemSelected);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('menu-item-selected', this.handleMenuItemSelected);
  }

  private handleMenuItemSelected = () => {
    this.open = false;
  }

  private handleItemClick(item: MenuItem) {
    if (!item.children?.length) {
      item.action?.();
      this.open = false;
    }
  }

  private toggleMenu() {
    this.open = !this.open;
  }

  render() {
    return html`
      <button 
        class="menu-button ${this.open ? 'open' : ''}"
        @click="${this.toggleMenu}"
      >
        <span class="bar"></span>
        <span class="bar"></span>
        <span class="bar"></span>
      </button>
      <div class="menu-container">
        ${this.open ? html`
          <menu-list
            .items="${this.menuItems}"
            .onItemClick="${(item: MenuItem) => this.handleItemClick(item)}"
          ></menu-list>
        ` : ''}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'main-menu': MainMenuElement;
  }
} 