let count = 0;

const value = document.getElementById("value");
const btns = document.querySelectorAll(".btn");

btns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const styles = e.currentTarget.classList;
    if (styles.contains("decrease")) {
      count--;
    } else if (styles.contains("increase")) {
      count++;
    } else {
      count = 0;
    }

    if (count > 0) {
      value.style.color = "#228B22";
    }
    if (count < 0) {
      value.style.color = "#f00";
    }
    if (count === 0) {
      value.style.color = "#222";
    }
    value.textContent = count;
  });
});
