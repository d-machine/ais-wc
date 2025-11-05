import { LitElement, html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { Tab } from "./types";
import './tab-header-element';

@customElement('tab-container')
export class TabContainerElement extends LitElement {
  @property({ type: Array }) tabs: Tab[] = [];
  @state() private activeId: string = '';

  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      height: 100%;
      background: white;
    }

    .tab-content {
      flex: 1;
      padding: 16px;
      overflow: auto;
    }
  `;

  firstUpdated() {
    if (this.tabs.length > 0) {
      this.activeId = this.tabs[0].id;
    }
  }

  render() {
    const activeTab = this.tabs.find(tab => tab.id === this.activeId);

    return html`
      <tab-header 
        .tabs="${this.tabs}"
        .activeId="${this.activeId}"
        @tab-change="${this._handleTabChange}"
      ></tab-header>
      <div class="tab-content">
        ${activeTab?.content || ''}
      </div>
    `;
  }

  private _handleTabChange(e: CustomEvent<{id: string}>) {
    this.activeId = e.detail.id;
  }
} 