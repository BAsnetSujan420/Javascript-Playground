const colors = [
  "plum",
  "berry",
  "navy",
  "rgba(144,111,200)",
  "#f15025",
  "#ff652f",
  "denim",
  "olive",
];

const btn = document.querySelector(".btn");
const color = document.querySelector(".color");

btn.addEventListener("click", () => {
  const randomNumber = getRandomNumber();

  document.body.style.backgroundColor = colors[randomNumber];
  color.textContent = colors[randomNumber];
});

function getRandomNumber() {
  return Math.floor(Math.random() * colors.length);
}
