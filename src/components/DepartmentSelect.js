import { html, css, LitElement } from 'lit';
import './TextInput';

class DepartmentSelector extends LitElement {
static styles = css`
  :host {
    font-family: 'Arial', sans-serif;
    display: block;
    margin: 0 auto;
    max-width: 800px;
  }

  .input-container {
    position: relative;
    margin: 20px 0;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .choose-button {
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    cursor: pointer;
    margin-top:10px;
    margin-bottom: 10px;
    align-self: center;
  }

  .choose-button:hover {
    background-color: #0056b3;
  }

  .overlay.visible {
    display: block;
  }

  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
    display: none;
    z-index: 999;
  }

  .modal {
    background: white;
    position: absolute;
    top: 20%;
    left: 50%;
    transform: translateX(-50%);
    padding: 20px;
    border-radius: 8px;
    width: 80%;
    max-width: 600px;
    overflow: hidden;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 15px;
    max-height: 400px;
    overflow-y: auto;
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  }

  .department-cell {
    padding: 12px;
    margin: 5px;
    cursor: pointer;
    border: 1px solid #ccc;
    border-radius: 4px;
    transition: background-color 0.3s ease, transform 0.3s ease;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    font-size: 16px;
  }

  .department-cell:hover {
    background-color: #f0f0f0;
    transform: scale(1.05);
  }

  .focused {
    background-color: #007bff;
    color: white;
  }

  .selected {
    background-color: #28a745;
    color: white;
  }

  .input-text-container {
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  input-text {
    width: 100%;
  }
`;

static properties = {
  departments: { type: Array },
  selectedDepartment: { type: String },
  selectedDepartmentId: { type: Number },
  isModalOpen: { type: Boolean },
  activeCellIndex: { type: Number },
  error: { type: String },
};

constructor() {
  super();
  this.departments = [
    { id: 1, name: 'Computer Science' },
    { id: 2, name: 'Electrical Engineering' },
    { id: 3, name: 'Mechanical Engineering' },
    { id: 4, name: 'Civil Engineering' },
    { id: 5, name: 'Mathematics' },
    { id: 6, name: 'Physics' },
    { id: 7, name: 'Chemistry' },
    { id: 8, name: 'Biology' },
    { id: 9, name: 'Economics' }
  ];
  this.selectedDepartment = '';
  this.selectedDepartmentId = null;
  this.isModalOpen = false;
  this.activeCellIndex = 0;
}

openModal() {
  this.isModalOpen = true;
  setTimeout(() => this.focusCell(), 0);
}

closeModal() {
  this.isModalOpen = false;
}

handleCellHover(index) {
  this.activeCellIndex = index;
}

handleCellClick(department) {
  this.selectedDepartment = department.name; 
  this.selectedDepartmentId = department.id;
  this.fetchEmployeeData(department.id); 
  this.closeModal();
  this.requestUpdate();
}

async fetchEmployeeData(departmentId) {
  console.log("Data fetching");
  try {
    const targetUrl = 'https://dummy.restapiexample.com/api/v1/employees';
    const response = await fetch(targetUrl);
    const data = await response.json();
    console.log(`Employees in the department with ID: ${departmentId}`);
    console.log(data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

handleKeyDown(e) {
  const rowSize = 3;
  const maxIndex = this.departments.length - 1;

  if (e.key === 'ArrowRight') {
    console.log("key");
    this.activeCellIndex = (this.activeCellIndex + 1) % this.departments.length;
  } else if (e.key === 'ArrowLeft') {
    console.log("key");
    this.activeCellIndex = (this.activeCellIndex - 1 + this.departments.length) % this.departments.length;
  } else if (e.key === 'ArrowDown') {
    console.log("key");
    this.activeCellIndex = Math.min(this.activeCellIndex + rowSize, maxIndex);
  } else if (e.key === 'ArrowUp') {
    console.log("key");
    this.activeCellIndex = Math.max(this.activeCellIndex - rowSize, 0);
  } else if (e.key === 'Enter') {
    const selectedDepartment = this.departments[this.activeCellIndex];
    this.selectedDepartment = selectedDepartment.name;
    this.selectedDepartmentId = selectedDepartment.id;
    this.fetchEmployeeData(selectedDepartment.id);
    this.closeModal();
    this.requestUpdate();
  }
  e.preventDefault();
}

focusCell() {
  const cells = this.shadowRoot.querySelectorAll('.department-cell');
  if (cells.length > 0) {
    cells[this.activeCellIndex].focus();
  }
}

render() {
  const selectedText = this.selectedDepartment || 'Select Department';

  return html`
    <div class="input-text-container">
      <input-text 
        label="Selected Department" 
        name="department" 
        input-type="text" 
        input-width="100%" 
        label-width="120px" 
        readonly
        .value="${selectedText}"
        placeholder="Select Department"
      ></input-text>
      <button class="choose-button" @click="${this.openModal}">Choose Department</button>
    </div>

    <div
      class="overlay ${this.isModalOpen ? 'visible' : ''}"
      @click="${this.closeModal}"
      tabindex="0"
      role="dialog"
      aria-labelledby="modalTitle"
      aria-hidden="${!this.isModalOpen}"
    >
      <div class="modal" @click="${e => e.stopPropagation()}" @keydown="${this.handleKeyDown}">
        <h2 id="modalTitle" class="visually-hidden">Select Department</h2>
        ${this.departments.map(
          (department, index) => html`
            <div
              class="department-cell ${this.selectedDepartment === department.name ? 'selected' : ''} ${this.activeCellIndex === index ? 'focused' : ''}"
              @click="${() => this.handleCellClick(department)}"
              @mouseenter="${() => this.handleCellHover(index)}"
              tabindex="0"
              role="button"
              aria-selected="${this.selectedDepartment === department.name}"
            >
              ${department.name}
            </div>
          `
        )}
      </div>
    </div>
  `;
}
}

customElements.define('department-selector', DepartmentSelector);
//gap,label and input in same line position --relative Edit/view toggle scroll radio button(1st col) make a form for submission















