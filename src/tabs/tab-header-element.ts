import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { Tab } from "./types";

@customElement('tab-header')
export class TabHeaderElement extends LitElement {
  @property({ type: Array }) tabs: Tab[] = [];
  @property({ type: String }) activeId: string = '';

  static styles = css`
    :host {
      display: flex;
      background: #f3f3f3;
      padding-top: 4px;
    }

    .tab {
      display: flex;
      align-items: center;
      justify-content: center;
      background: #e1e1e1;
      cursor: pointer;
      font-size: 13px;
      color: #424242;
      height: 32px;
      box-sizing: border-box;
      border-radius: 4px 4px 0 0;
      margin-right: 1px;
      position: relative;
      min-width: 120px;
      user-select: none;
    }

    .tab:hover {
      background: #e8e8e8;
    }

    .tab.active {
      background: white;
      color: #000;
      z-index: 1;
    }

    .tab.active::after {
      content: '';
      position: absolute;
      bottom: -1px;
      left: 0;
      right: 0;
      height: 1px;
      background: white;
    }

    .tab-content {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      padding: 0 8px;
      height: 20px;
      line-height: 20px;
    }

    .close {
      width: 16px;
      height: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 3px;
      color: #666;
      cursor: pointer;
      opacity: 0.7;
      margin-left: 4px;
    }

    .close:hover {
      background-color: rgba(0, 0, 0, 0.1);
      opacity: 1;
    }

    .tab:not(.active) .close {
      opacity: 0.5;
    }

    .tab:not(.active):hover .close {
      opacity: 0.7;
    }
  `;

  render() {
    return html`
      ${this.tabs.map(tab => html`
        <div 
          class="tab ${tab.id === this.activeId ? 'active' : ''}"
          @click="${() => this._handleTabClick(tab.id)}"
        >
          <div class="tab-content">
            <span>${tab.title}</span>
            <div 
              class="close"
              @click="${(e: Event) => {
                e.stopPropagation();
                // Close functionality will be added later
              }}"
            >
              ×
            </div>
          </div>
        </div>
      `)}
    `;
  }

  private _handleTabClick(id: string) {
    this.dispatchEvent(new CustomEvent('tab-change', {
      detail: { id },
      bubbles: true,
      composed: true
    }));
  }
} 