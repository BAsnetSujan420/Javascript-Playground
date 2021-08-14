import { menu } from "./menu.js";

const sectionCenter = document.querySelector(".section-center");

// display all menu when page loads
window.addEventListener("DOMContentLoaded", () => {
  displayMenuItems(menu);
});

// display menu items
function displayMenuItems(menuItems) {
  let displayMenu = menuItems.map(function (menuItem) {
    return `<article class="menu-item">
          <img src=${menuItem.img} alt=${menuItem.title} class="photo" />
          <div class="item-info">
            <header>
              <h4>${menuItem.title}</h4>
              <h4 class="price">$${menuItem.price}</h4>
            </header>
            <p class="item-text">
              ${menuItem.desc}
            </p>
          </div>
        </article>`;
  });

  displayMenu = displayMenu.join("");
  // console.log(displayMenu);
  sectionCenter.innerHTML = displayMenu;
}
