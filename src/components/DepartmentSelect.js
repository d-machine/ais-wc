import { html, css, LitElement } from 'lit';
import './TableCell.js';
import './TableRow.js';
import './TableHeader.js';
import './TableElement.js';

class DepartmentSelector extends LitElement {
  static styles = css`
    :host {
      font-family: 'Arial', sans-serif;
      display: block;
      margin: 0 auto;
      width: var(--component-width, 100%);
    }

    .modal-backdrop {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000;
    }
    .button-container {
      display: flex;
      justify-content: center;
      gap:10px;
      margin-top: 10px;
    }
      .add-row-button {
      margin-top: 10px;
      padding: 8px 16px;
      background-color: #2196f3;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 14px;
    }

    .add-row-button:hover {
      background-color: #1976d2;
    }
    .modal {
      background: white;
      padding: 20px;
      border-radius: 8px;
      width: 90%;
      max-width: 800px;
      max-height: 80vh;
      position: relative;
      display: flex;
      flex-direction: column;
    }

    .close-button {
      position: absolute;
      top: -4px;
      right: 0px;
      background: none;
      border: none;
      font-size: 25px;
      cursor: pointer;
      padding: 5px;
      z-index: 2;
    }

    .table-container {
      overflow-y: auto;
      max-height: calc(80vh - 40px);
      position: relative;
    }

    table {
      width: 100%;
      border-collapse: separate;
      border-spacing: 0;
    }

    thead {
      position: sticky;
      top: 0;
      z-index: 1;
      background-color: white;
    }

    thead::after {
      content: '';
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      border-bottom: 2px solid #ddd;
    }

    th, td {
      padding: 12px;
      border: 1px solid #ddd;
      text-align: left;
      background-color: inherit;
    }

    th {
      background-color: #f4f4f4;
      font-weight: bold;
    }

    tr:hover {
      background-color: #f5f5f5;
    }

    .highlighted {
      background-color: #e3f2fd;
    }

    .selected {
      background-color: #bbdefb;
    }

    .checkbox {
      cursor: pointer;
      width: 16px;
      height: 16px;
    }

    .checkbox-cell {
      width: 40px;
      text-align: center;
    }

    .input-text-container {
      display: flex;
      flex-direction: column;
      width: 100%;
      margin-bottom: 20px;
    }

    input-text {
      width: 100%;
      cursor: pointer;
    }

    tbody tr:last-child td {
      border-bottom: 1px solid #ddd;
    }

    input[type="text"] {
      width: 100%;
      padding: 5px;
      box-sizing: border-box;
      border: 1px solid #ddd;
      background-color: #f9f9f9;
    }
  `;

  static properties = {
    rows: { type: Array },
    selectedRowIndex: { type: Number },
    highlightedRowIndex: { type: Number },
    selectedRow: { type: Object },
    isModalOpen: { type: Boolean },
    componentWidth: { type: String },
    readonly: { type: Boolean, reflect: true }, // Reflect to attribute
  };

  constructor() {
    super();
    this.rows = [
      { id: 1, specialization: 'Data Science', shift: 'Morning', department: 'Computer Science' },
      { id: 2, specialization: 'Drone Detection', shift: 'Afternoon', department: 'Electrical Engineering' },
      { id: 3, specialization: 'Heat Reactor', shift: 'Evening', department: 'Mechanical Engineering' },
      { id: 4, specialization: 'Bridge Structure', shift: 'Morning', department: 'Civil Engineering' },
      { id: 5, specialization: 'Real Analysis', shift: 'Afternoon', department: 'Mathematics' },
      { id: 6, specialization: 'Artificial Intelligence', shift: 'Morning', department: 'Computer Science' },
      { id: 7, specialization: 'Quantum Computing', shift: 'Evening', department: 'Physics' },
      { id: 8, specialization: 'Cybersecurity', shift: 'Afternoon', department: 'Information Technology' },
      { id: 9, specialization: 'Geotechnical Engineering', shift: 'Morning', department: 'Civil Engineering' },
      { id: 10, specialization: 'Econometrics', shift: 'Afternoon', department: 'Economics' },
      { id: 11, specialization: 'Biomedical Engineering', shift: 'Morning', department: 'Biotechnology' },
      { id: 12, specialization: 'Autonomous Vehicles', shift: 'Evening', department: 'Mechanical Engineering' },
      { id: 13, specialization: 'Network Security', shift: 'Morning', department: 'Computer Science' },
    ];
    this.selectedRowIndex = -1;
    this.highlightedRowIndex = -1;
    this.selectedRow = null;
    this.isModalOpen = false;
    this.componentWidth = '100%';
    this.readonly = false;
  }


  updated(changedProperties) {
    if (changedProperties.has('readonly')) {
      this.readonly = this.hasAttribute('readonly');
    }
  }

  firstUpdated() {
    this.addEventListener('keydown', this.handleKeyDown);
    this.updateStyles();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('keydown', this.handleKeyDown);
  }

  updateStyles() {
    this.style.setProperty('--component-width', this.componentWidth);
  }

  openModal() {
    this.isModalOpen = true;
    this.highlightedRowIndex = this.selectedRowIndex >= 0 ? this.selectedRowIndex : 0;
    setTimeout(() => {
      const table = this.shadowRoot.querySelector('table');
      if (table) table.focus();
    }, 100);
  }

  closeModal() {
    this.isModalOpen = false;
    this.highlightedRowIndex = -1;
  }

  handleRowSelect(index) {
    if (this.selectedRowIndex === index) {
      this.selectedRowIndex = -1;
      this.selectedRow = null;
    } else {
      this.selectedRowIndex = index;
      this.selectedRow = this.rows[index];
    }
    this.requestUpdate();
  }
  updated(changedProperties) {
    if (changedProperties.has('readonly')) {
      this.readonly = this.hasAttribute('readonly');
      if (!this.readonly) {
        this.rows = [
          { id: 1, specialization: '', shift: '', department: '' },
        ];
      }
    }
  }

  addNewRow() {
    const newId = this.rows.length + 1;
    this.rows = [...this.rows, { id: newId, specialization: '', shift: '', department: '' }];
    this.requestUpdate();
  }

  handleKeyDown(e) {
    if (!this.isModalOpen) return;

    const rowCount = this.rows.length;
    let newIndex = this.highlightedRowIndex;

    switch (e.key) {
      case 'ArrowDown':
      case 'ArrowRight':
        newIndex = Math.min(this.highlightedRowIndex + 1, rowCount - 1);
        break;
      case 'ArrowUp':
      case 'ArrowLeft':
        newIndex = Math.max(this.highlightedRowIndex - 1, 0);
        break;
      case 'Enter':
        if (this.highlightedRowIndex >= 0) {
          this.handleRowSelect(this.highlightedRowIndex);
          this.closeModal();
        }
        break;
      case 'Escape':
        this.closeModal();
        break;
      default:
        return;
    }

    this.highlightedRowIndex = newIndex;
    this.requestUpdate();
    e.preventDefault();
  }

  handleCellEdit(e, rowIndex, column) {
    if (this.readonly) return;

    const newValue = e.target.value;
    this.rows[rowIndex][column] = newValue;
    this.requestUpdate();
  }

render() {
  return html`
    <div class="input-text-container">
      <input-text 
        label="${this.readonly ? 'Selected Department' : ''}" 
        name="department" 
        inputType="text" 
        inputWidth="100%" 
        labelWidth="150px" 
        readonly
        @dblclick="${this.openModal}"
        .value="${this.selectedRow ? `${this.selectedRow.specialization} ` : ''}"
        placeholder="Select a department"
        placeholder="${this.readonly ? 'Select a department' : 'Write department'}"
      ></input-text>
    </div>

    ${this.isModalOpen ? html`
      <div class="modal-backdrop">
        <div class="modal">
          <button class="close-button" @click="${this.closeModal}">&times;</button>
          <div class="table-container">
            <table-element>
              <thead>
                <table-row>
                  ${!this.readonly ? '' : html`<table-header>Select</table-header>`}
                  <table-header>Specialization</table-header>
                  <table-header>Shift</table-header>
                  <table-header>Department</table-header>
                </table-row>
              </thead>
              <tbody>
                ${this.rows.map((row, index) => html`
                  <tr class="${this.getRowClasses(index)}">
                    ${!this.readonly ? '' : html`
                      <table-cell class="checkbox-cell">
                        <input type="checkbox" 
                          .checked="${this.selectedRowIndex === index}" 
                          @click="${() => {this.handleRowSelect(index);
                                    this.closeModal();}}" 
                          class="checkbox" />
                      </table-cell>
                    `}
                    <td><input 
                        type="text" 
                        .value="${row.specialization}" 
                        @input="${(e) => this.handleCellEdit(e, index, 'specialization')}" 
                        ?readonly="${this.readonly}" 
                        ?disabled="${this.readonly}" 
                        /></td>
                    <td><input 
                        type="text" 
                        .value="${row.shift}" 
                        @input="${(e) => this.handleCellEdit(e, index, 'shift')}" 
                        ?readonly="${this.readonly}" 
                        ?disabled="${this.readonly}" 
                        /></td>
                    <td><input 
                        type="text" 
                        .value="${row.department}" 
                        @input="${(e) => this.handleCellEdit(e, index, 'department')}" 
                        ?readonly="${this.readonly}" 
                        ?disabled="${this.readonly}" 
                        /></td>
                  </tr>
                `)}
              </tbody>
            </table-element>
          </div>
               ${!this.readonly ? html`
              <div class="button-container">
                <button class="add-row-button" @click="${this.addNewRow}">
                  Add Row
                </button>
                <button class="add-row-button" @click="${this.addNewRow}">
                  Add data
                </button>
              </div>
            ` : ''}
        </div>
      </div>
    ` : ''}
  `;
}

  getRowClasses(index) {
    let classes = [];
    if (index === this.highlightedRowIndex) classes.push('highlighted');
    if (index === this.selectedRowIndex) classes.push('selected');
    return classes.join(' ');
  }

get getRows(){
  if(this.readonly){
    return this.selectedRow
  }
  else{
    return this.rows;

  }

}

}

customElements.define('department-selector', DepartmentSelector);