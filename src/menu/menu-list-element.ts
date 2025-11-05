import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { MenuItem } from "./types";
import "./menu-item-element";

@customElement('menu-list')
export class MenuListElement extends LitElement {
  @property({ type: Array }) items: MenuItem[] = [];
  @property({ type: Function }) onItemClick?: (item: MenuItem) => void;
  @property({ type: Boolean }) isSubmenu = false;

  static styles = css`
    :host {
      display: block;
      position: relative;
    }

    .menu-list {
      background: white;
      min-width: 200px;
      box-shadow: 0 2px 5px rgba(0,0,0,0.2);
      border-radius: 4px;
    }

    /* Main menu positioning */
    :host(:not([isSubmenu])) .menu-list {
      position: relative;
    }

    /* Submenu positioning */
    :host([isSubmenu]) {
      position: absolute;
      left: calc(100% - 10px);
      top: 0;
      padding-left: 10px;
    }

    /* Create invisible overlap area */
    :host([isSubmenu])::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 10px;
      height: 100%;
      background: transparent;
    }

    menu-item:not(:last-child) {
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    }

    /* First menu item */
    menu-item:first-child .menu-item {
      border-top-left-radius: 4px;
      border-top-right-radius: 4px;
    }

    /* Last menu item */
    menu-item:last-child .menu-item {
      border-bottom-left-radius: 4px;
      border-bottom-right-radius: 4px;
    }
  `;

  render() {
    return html`
      <div class="menu-list">
        ${this.items.map(item => html`
          <menu-item
            .label="${item.label}"
            .menuChildren="${item.children || []}"
            .onClick="${() => this.onItemClick?.(item)}"
          ></menu-item>
        `)}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'menu-list': MenuListElement;
  }
} 