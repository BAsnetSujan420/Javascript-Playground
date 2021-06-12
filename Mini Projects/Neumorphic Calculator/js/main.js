const $input = document.querySelector("input")

document.querySelectorAll(".num__key").forEach(
    element => {
        element.onclick = () => $input.value = $input.value !== "0" ? $input.value + element.innerText : element.innerText;
    }
)