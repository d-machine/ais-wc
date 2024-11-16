import { html, css, LitElement } from 'lit';

class InputText extends LitElement {
static styles = css`
:host {
  display: block;
  position: relative;
  font-family: Arial, sans-serif;
  width: var(--component-width, 100%);
}

.input-container {
  display: flex;
  align-items: center;
  gap: var(--gap, 8px);
  position: relative;
  top: var(--top-position, 0);
  left: var(--left-position, 0);
  margin: 20px auto;
  width: 100%;
}

label {
  font-size: 14px;
  color: #333;
  font-weight: 600;
  flex-shrink: 0;
  width: var(--label-width, auto);
}

input {
  flex: 1;
  width: var(--input-width, auto);
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

updated(changedProperties) {
super.updated(changedProperties);
this.style.setProperty('--component-width', this.componentWidth);
this.style.setProperty('--input-width', this.inputWidth);
this.style.setProperty('--label-width', this.labelWidth);
this.style.setProperty('--gap', this.gap);
this.style.setProperty('--top-position', this.top);
this.style.setProperty('--left-position', this.left);
}

render() {
return html`
  <div class="input-container">
    ${this.label
      ? html`<label>${this.label}</label>`
      : ''}
    <input
      type="${this.inputType}"
      .placeholder=${this.placeholder}
      .value=${this.value}
      name=${this.name}
      ?readonly=${this.readonly}
      class=${this.readonly ? 'readonly-input' : ''}
      @input=${this.handleInput}
    />
  </div>
`;
}

handleInput(event) {
this.value = event.target.value;
this.dispatchEvent(new CustomEvent('input', {
  detail: { value: this.value },
  bubbles: true,
  composed: true
}));
}
}

customElements.define('input-text', InputText);