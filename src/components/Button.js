import { html, css, LitElement } from 'lit';

class SubmitButton extends LitElement {
  static styles = css`
    :host {
      display: inline-block;
      position: relative;
    }

    button {
      background-color: #0073e6;
      color: white;
      border: none;
      padding: 10px 20px;
      font-size: 16px;
      font-weight: bold;
      cursor: pointer;
      border-radius: 5px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      transition: background-color 0.3s ease;
      position: relative;
      display: inline-block;
    }

    button:hover {
      background-color: #005bb5;
    }

    button:focus {
      outline: none;
      box-shadow: 0 0 0 3px rgba(0, 115, 230, 0.3);
    }

    button:active {
      background-color: #00408f;
    }
  `;

  static properties = {
    label: { type: String },
    positionTop: { type: String },
    positionLeft: { type: String },
  };

  constructor() {
    super();
    this.label = 'Submit';
    this.positionTop = '0px';
    this.positionLeft = '0px';
  }

  render() {
    return html`
      <button
        style="top: ${this.positionTop}; left: ${this.positionLeft};"
        @click=${this.handleClick}
      >
        ${this.label}
      </button>
    `;
  }

  handleClick() {
    this.dispatchEvent(new CustomEvent('submit', { detail: 'Form submitted', bubbles: true, composed: true }));
  }
}

customElements.define('submit-button', SubmitButton);
