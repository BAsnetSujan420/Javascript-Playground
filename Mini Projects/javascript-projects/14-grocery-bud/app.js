// ****** SELECT ITEMS **********

const alert = document.querySelector(".alert");
const form = document.querySelector(".grocery-form");
const grocery = document.getElementById("grocery");

const submitBtn = document.querySelector(".submit-btn");
const container = document.querySelector(".grocery-container");
const list = document.querySelector(".grocery-list");
const clearBtn = document.querySelector(".clear-btn");

// edit option
let editElement;
let editFlag = false;
let editID = "";

// ****** EVENT LISTENERS **********

//submit form
form.addEventListener("submit", addItem);

// ****** FUNCTIONS **********

//add item
function addItem(e) {
  e.preventDefault();
  const value = grocery.value;

  if (value !== "" && !editFlag) {
    const element = document.createElement("article");
    //add class
    element.classList.add("grocery-item");
    //add id
    const id = new Date().getTime().toString();
    let attr = document.createAttribute("data-id");
    attr.value = id;
    element.setAttributeNode(attr);
    // add value to HTML
    element.innerHTML = `<p class="title">${value}</p>
    <div class="btn-container">
      <!-- edit btn -->
      <button type="button" class="edit-btn">
        <i class="fas fa-edit"></i>
      </button>
      <!-- delete btn -->
      <button type="button" class="delete-btn">
        <i class="fas fa-trash"></i>
      </button>
    </div>`;

    //append child
    list.appendChild(element);
    //display alert
    displayAlert("item added to the list", "success");
    //show container
    container.classList.add("show-container");
    // clear input field
    clearInputField();
  } else if (value !== "" && editFlag) {
    editElement.innerHTML = value;
    displayAlert("value changed", "success");
  } else {
    displayAlert("please enter value", "danger");
  }
}

//display alert
function displayAlert(text, action) {
  alert.textContent = text;
  alert.classList.add(`alert-${action}`);
  //remove alert
  setTimeout(() => {
    alert.textContent = "";
    alert.classList.remove(`alert-${action}`);
  }, 1200);
}

// clear input field
function clearInputField() {
  grocery.value = "";
  editFlag = false;
  editID = "";
  submitBtn.textContent = "submit";
}

// ****** LOCAL STORAGE **********

// ****** SETUP ITEMS **********
