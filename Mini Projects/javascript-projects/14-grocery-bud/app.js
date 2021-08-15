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

//clear items
clearBtn.addEventListener("click", clearItems);

// display items onload
window.addEventListener("DOMContentLoaded", setupItems);

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

    // delete and edit buttons can be accessed only after adding items
    const deleteBtn = element.querySelector(".delete-btn");
    deleteBtn.addEventListener("click", deleteItem);
    const editBtn = element.querySelector(".edit-btn");
    editBtn.addEventListener("click", editItem);

    //append child
    list.appendChild(element);
    //display alert
    displayAlert("item added to the list", "success");
    //show container
    container.classList.add("show-container");
    // add to local storage
    addToLocalStorage(id, value);
    // clear input field
    clearInputField();
  } else if (value !== "" && editFlag) {
    editElement.innerHTML = value;
    displayAlert("value changed", "success");

    // edit  local storage
    editLocalStorage(editID, value);
    clearInputField();
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

// clear items
function clearItems() {
  const items = document.querySelectorAll(".grocery-item");
  if (items.length > 0) {
    items.forEach((item) => {
      list.removeChild(item);
    });
  }
  container.classList.remove("show-container");
  displayAlert("empty list", "danger");
  clearInputField();
  localStorage.removeItem("list");
}

//delete item
function deleteItem(e) {
  const element = e.currentTarget.parentElement.parentElement;
  const id = element.dataset.id;

  list.removeChild(element);

  if (list.children.length === 0) {
    container.classList.remove("show-container");
  }
  displayAlert("item removed", "danger");
  clearInputField();

  // remove from local storage
  removeFromLocalStorage(id);
}

//edit item
function editItem(e) {
  const element = e.currentTarget.parentElement.parentElement;
  // set edit item
  editElement = e.currentTarget.parentElement.previousElementSibling;
  // set form value
  grocery.value = editElement.innerHTML;
  editFlag = true;
  editID = element.dataset.id;
  submitBtn.textContent = "edit";
}

// ****** LOCAL STORAGE **********

//add to local storage
function addToLocalStorage(id, value) {
  const grocery = { id, value };
  let items = getLocalStorage();
  items.push(grocery);
  localStorage.setItem("groceryList", JSON.stringify(items));
}

function getLocalStorage() {
  return localStorage.getItem("groceryList")
    ? JSON.parse(localStorage.getItem("groceryList"))
    : [];
}

// remove item - local storage
function removeFromLocalStorage(id) {
  let items = getLocalStorage();

  items = items.filter((item) => {
    if (item.id !== id) {
      return item;
    }
  });
  localStorage.setItem("groceryList", JSON.stringify(items));
}

// edit item - local storage
function editLocalStorage(id, value) {
  let items = getLocalStorage();

  items = items.map((item) => {
    if (item.id === id) {
      item.value = value;
    }
    return item;
  });
  localStorage.setItem("groceryList", JSON.stringify(items));
}
// ****** SETUP ITEMS **********

/**setup  local storage  */
function setupItems() {
  let items = getLocalStorage();

  if (items.length > 0) {
    items.forEach((item) => {
      createListItem(item.id, item.value);
    });
    container.classList.add("show-container");
  }
}

function createListItem(id, value) {
  const element = document.createElement("article");
  let attr = document.createAttribute("data-id");
  attr.value = id;
  element.setAttributeNode(attr);
  element.classList.add("grocery-item");
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
              </div>
            `;
  // add event listeners to both buttons;
  const deleteBtn = element.querySelector(".delete-btn");
  deleteBtn.addEventListener("click", deleteItem);
  const editBtn = element.querySelector(".edit-btn");
  editBtn.addEventListener("click", editItem);

  // append child
  list.appendChild(element);
}
