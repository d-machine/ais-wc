import { html, css, LitElement } from 'lit';

class InputText extends LitElement {
  static styles = css`
    :host {
      display: block;
      position: relative;
      font-family: Arial, sans-serif;
    }

    .input-container {
      display: flex;
      align-items: center;
      gap: var(--gap, 8px);
      position: relative;
      top: var(--top, 0);
      left: var(--left, 0);
      margin: 20px auto;
      width: var(--component-width, 100%);
    }

    label {
      font-size: 14px;
      color: #333;
      font-weight: 600;
      flex-shrink: 0;
    }

    input {
      flex-shrink: 0;
      padding: 12px 16px;
      font-size: 16px;
      color: #333;
      background-color: #fafafa;
      border: 1px solid #ddd;
      border-radius: 6px;
      outline: none;
      transition: all 0.3s ease;
      box-sizing: border-box;
    }

    input:hover {
      border-color: #ccc;
    }

    input:focus {
      border-color: #0073e6;
      box-shadow: 0 4px 8px rgba(0, 115, 230, 0.15);
    }

    input::placeholder {
      color: #aaa;
      font-style: italic;
    }

    input:focus::placeholder {
      color: #ccc;
    }

    .readonly-input {
      background-color: #f2f2f2;
      color: #666;
      cursor: not-allowed;
      border-color: #ddd;
    }

    .readonly-input::placeholder {
      color: #bbb;
    }
  `;

  static properties = {
    label: { type: String },
    placeholder: { type: String },
    readonly: { type: Boolean },
    value: { type: String },
    name: { type: String },
    inputType: { type: String },
    inputWidth: { type: String },
    labelWidth: { type: String },
    componentWidth: { type: String },
    gap: { type: String },
    top: { type: String },
    left: { type: String },
  };

  constructor() {
    super();
    this.label = '';
    this.placeholder = '';
    this.readonly = false;
    this.value = '';
    this.name = '';
    this.inputType = 'text';
    this.inputWidth = 'auto';
    this.labelWidth = 'auto';
    this.componentWidth = '100%';
    this.gap = '8px';
    this.top = '0';
    this.left = '0';
  }

  render() {
    return html`
      <div
        class="input-container"
        style="
          top: ${this.top};
          left: ${this.left};
          width: ${this.componentWidth};
          gap: ${this.gap};
        "
      >
        ${this.label
          ? html`<label style="width: ${this.labelWidth};">${this.label}</label>`
          : ''}
        <input
          type="${this.inputType}"
          .placeholder=${this.placeholder}
          .value=${this.inputValue} 
          name=${this.name}
          ?readonly=${this.readonly}
          class=${this.readonly ? 'readonly-input' : ''}
          style="width: ${this.inputWidth};"
          @input=${this.handleInput} 
        />
      </div>
    `;
  }

  handleInput(event) {
    this.inputValue = event.target.value;  
  }

  get inputValue() {
    return this.value;
  }

  get inputLabel() {
    return this.label;
  }

  set inputValue(val) {
    this.value = val;
    this.requestUpdate();
  }
}

customElements.define('input-text', InputText);
