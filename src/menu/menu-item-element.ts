import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { MenuItem } from "./types";
import "./menu-list-element";

@customElement('menu-item')
export class MenuItemElement extends LitElement {
  @property({ type: String }) label = '';
  @property({ type: Array }) menuChildren: MenuItem[] = [];
  @property({ type: Boolean }) isOpen = false;
  @property({ type: Function }) onClick?: () => void;

  static styles = css`
    :host {
      display: block;
      position: relative;
    }

    .menu-item-container {
      position: relative;
    }

    .menu-item {
      padding: 6px 12px;
      cursor: pointer;
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: relative;
      background: white;
      transition: all 0.2s ease;
    }

    .menu-item:hover {
      background-color: #f5f0eb;
      transform: translateY(-1px);
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      z-index: 1;
    }

    .menu-item:active {
      opacity: 0.5;
      transform: translateY(0);
      transition: all 0.1s ease;
    }

    .has-children::after {
      content: "›";
      margin-left: 8px;
      font-size: 14px;
    }
  `;

  private handleClick(e: Event) {
    e.stopPropagation();
    if (!this.hasChildren) {
      if (this.onClick) {
        this.onClick();
      }
      this.dispatchEvent(new CustomEvent('menu-item-selected', {
        bubbles: true,
        composed: true
      }));
    }
  }

  private handleMouseEnter() {
    if (this.hasChildren) {
      this.isOpen = true;
    }
  }

  private handleMouseLeave(e: MouseEvent) {
    if (this.hasChildren) {
      const relatedTarget = e.relatedTarget as HTMLElement;
      if (!this.contains(relatedTarget)) {
        this.isOpen = false;
      }
    }
  }

  private get hasChildren(): boolean {
    return this.menuChildren && this.menuChildren.length > 0;
  }

  render() {
    return html`
      <div class="menu-item-container"
        @mouseenter="${this.handleMouseEnter}"
        @mouseleave="${this.handleMouseLeave}"
      >
        <div 
          class="menu-item ${this.hasChildren ? 'has-children' : ''}"
          @click="${this.handleClick}"
        >
          ${this.label}
        </div>
        ${this.hasChildren && this.isOpen ? html`
          <menu-list
            .items="${this.menuChildren}"
            .onItemClick="${this.onClick}"
            isSubmenu
          ></menu-list>
        ` : ''}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'menu-item': MenuItemElement;
  }
} 