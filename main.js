let btn = document.querySelector("button");
let select = document.querySelector("select");
let level = document.querySelector(".level");
let seconds = document.querySelector(".seconds");
let input = document.querySelector("input");
let text = document.querySelector(".text");
let words = document.querySelector(".words");
let time = document.querySelector(".time span");
let currentScore = document.querySelector(".current-score");
let totalScore = document.querySelector(".total");
let container = document.querySelector(".container");
let details = document.querySelector(".details");
let footer = document.querySelector(".footer");
let counter = 0;
let flag = true;
let easyWords = ["Apple", "Table", "Cat", "Chair", "Green", "Bird", "Orange", "Water", "Moon", "Tree", "Light", "Cloud", "Dog", "Ball", "Book", "Sun", "Blue", "Door", "red", "Flower"];
let mediumWords = ["Radio", "Money", "Phone", "Watch", "Yellow", "Music", "Dance", "Flower", "Coffee", "Lemon", "Animal", "Mountain", "Puzzle", "Window", "River", "Planet", "Garden", "School", "Family", "Science"];
let hardWords = ["Animal", "Serendipity", "Quizzical", "Mountain", "Obfuscate", "Zephyr", "School", "Languid", "Euphoria", "Nebula", "Spectacular", "Metamorphosis", "Paradox", "Conundrum", "Nostalgia", "Chronology", "Ephemeral", "Hierarchy", "Unpredictable", "Altruistic"];

function startGame(arr) {
    text.innerHTML = arr[Math.floor(Math.random() * arr.length)];
    arr.splice(arr.indexOf(text.innerHTML), 1);
    words.innerHTML = "";
    for (let i = 0; i < arr.length; i++)
        words.innerHTML += `<span>${arr[i]}</span>`;
}
function Update() {
    let val = select.value;
    input.focus();
    level.innerHTML = val;
    val === "Easy" ? startGame(easyWords) : val === "Medium" ? startGame(mediumWords) : startGame(hardWords);
    currentScore.innerHTML = counter;
    input.onpaste = () => false;
    if (flag) 
        flag = false;
    else {
        seconds.innerHTML = level.innerHTML === "Easy" ? "7" : level.innerHTML === "Medium" ? "5" : "3";
        time.innerHTML = seconds.innerHTML;
    }
    let count;
    let isTimerRunning = false;
    input.oninput = () => {
    if (input.value.toLowerCase().trim() === text.innerHTML.toLowerCase()) {
        counter++;
        input.value = "";
        if (isTimerRunning) {
            clearInterval(count);
            isTimerRunning = false;
        }
        if (counter == totalScore.innerHTML) {
            details.style.display = "none";
            input.style.display = "none";
            footer.style.display = "none";
            text.innerHTML = "Congratulations";
            text.style.cssText = "color: #4caf50;background:#fff; display: block; font-size: 40px; padding: 10px 0; margin: 0; border-radius: 5px;user-select: auto";
        }
        else {
            if (counter + 1 == totalScore.innerHTML) {
                words.style.display = "none";
                input.style.marginBottom = "20px";
            }
            Update();
        }
    }
}
    if (!isTimerRunning) {
    isTimerRunning = true;
    count = setInterval(() => {
        time.innerHTML--;
        if (time.innerHTML == 0) {
            details.style.display = "none";
            input.style.display = "none";
            words.style.display = "none";
            footer.style.display = "none";
            text.innerHTML = `Game Over You Got ${counter} From ${totalScore.innerHTML}`;
            text.style.cssText = "color: #f30000;background:#fff; display: block; font-size: 40px; padding: 10px 0; margin: 0; border-radius: 5px;user-select: auto";
            let button = document.createElement("button");
            button.textContent = "Try Again";
            button.style.cssText = "display:block;margin:20px auto 0;width:fit-content;padding:15px 30px;";
            text.after(button);
            button.onclick = () => location.reload();
            clearInterval(count);
            isTimerRunning = false;
            }
        }, 1000);
    }
}
btn.onclick = () => {
    btn.parentElement.remove();
    document.querySelectorAll(".page .container > :not(form)").forEach(e => e.style.display = e.className === "footer" ? "flex" : "block");
    seconds.innerHTML = select.value === "Easy" ? "10" : select.value === "Medium" ? "8" : "6";
    time.innerHTML = seconds.innerHTML;
    totalScore.innerHTML = (select.value === "Easy" ? easyWords : select.value === "Medium" ? mediumWords : hardWords).length;
    level.classList.add(`${select.value.toLowerCase()}`);
    seconds.classList.add(`${select.value.toLowerCase()}`);
    time.classList.add(`${select.value.toLowerCase()}`);
    Update();
}