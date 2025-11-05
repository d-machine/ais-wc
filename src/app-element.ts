import { LitElement, html, css } from "lit";
import { customElement } from "lit/decorators.js";
import './header/header-element';
import './tabs/tab-container-element';
import { MenuItem } from './menu/types';
import { Tab } from './tabs/types';

const APP_MENU_ITEMS: MenuItem[] = [
  {
    label: 'Components',
    children: [
      { label: 'Menu', action: () => console.log('Menu clicked') },
      { label: 'Tabs', action: () => console.log('Tabs clicked') },
      { label: 'Modal', action: () => console.log('Modal clicked') }
    ]
  },
  {
    label: 'Theme',
    children: [
      { label: 'Light', action: () => console.log('Light theme clicked') },
      { label: 'Dark', action: () => console.log('Dark theme clicked') }
    ]
  },
  {
    label: 'About',
    action: () => console.log('About clicked')
  }
];

const DEMO_TABS: Tab[] = [
  {
    id: 'tab1',
    title: 'First Tab',
    content: 'This is the content of the first tab'
  },
  {
    id: 'tab2',
    title: 'Second Tab',
    content: 'Content for the second tab goes here'
  },
  {
    id: 'tab3',
    title: 'Third Tab',
    content: 'Third tab content is displayed here'
  },
  {
    id: 'tab4',
    title: 'Fourth Tab',
    content: 'Here is the fourth tab content'
  },
  {
    id: 'tab5',
    title: 'Fifth Tab',
    content: 'And finally, the fifth tab content'
  }
];

@customElement('app-element')
export class AppElement extends LitElement {
  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
      background-color: #f5f5f5;
      box-sizing: border-box;
    }

    .content {
      flex: 1;
      display: flex;
      flex-direction: column;
      margin-top: 40px;  /* Header height */
    }

    tab-container {
      flex: 1;
      margin: 0;
      border: none;
      border-radius: 0;
    }
  `;

  render() {
    return html`
      <header-element 
        .menuItems="${APP_MENU_ITEMS}"
        title="Web Components Demo"
      >
        <div slot="right">
        </div>
      </header-element>
      <div class="content">
        <tab-container .tabs="${DEMO_TABS}"></tab-container>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'app-element': AppElement;
  }
} 