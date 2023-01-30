/* colors:
1. Red - rgb(255,0,0)
2. green - rgb(0,128,0)
3. brown - rgb(150,75,0)
4. white - rgb(255,255,255)
5. blue - rgb(0,0,255)
6. orange - rgb(255,165,0)
7. yellow - rgb(255,255,0)
8. purple - rgb(128,0,128)
9. maroon - rgb(128,0,0)
10. black - rgb(0,0,0)
11. gray - rgb(128,128,128)
12. pink - rgb(255,0,255)
13. cream - rgb(255,253,208)
14. teal - rgb(0,128,128)
15. lime - rgb(0,255,0)
16. silver - rgb(192,192,192)*/

let colors = [
  { color: "red", value: "rgb(255,0,0)", textColor: "white" },
  { color: "green", value: "rgb(0,128,0)", textColor: "white" },
  { color: "brown", value: "rgb(150,75,0)", textColor: "white" },
  { color: "white", value: "rgb(255,255,255)", textColor: "black" },
  { color: "blue", value: "rgb(0,0,255)", textColor: "white" },
  { color: "orange", value: "rgb(255,165,0)", textColor: "white" },
  { color: "yellow", value: "rgb(255,255,0)", textColor: "black" },
  { color: "purple", value: "rgb(128,0,128)", textColor: "white" },
  { color: "maroon", value: "rgb(128,0,0)", textColor: "white" },
  { color: "black", value: "rgb(0,0,0)", textColor: "white" },
  { color: "gray", value: "rgb(128,128,128)", textColor: "white" },
  { color: "pink", value: "rgb(255,0,255)", textColor: "white" },
  { color: "cream", value: "rgb(255,253,208)", textColor: "black" },
  { color: "teal", value: "rgb(0,128,128)", textColor: "white" },
  { color: "lime", value: "rgb(0,255,0)", textColor: "black" },
  { color: "silver", value: "rgb(192,192,192)", textColor: "black" },
];
let gridCount = 4;

let toFind,
  score = 0,
  gameOverStatus = false;
let randomizedColors = [],
  guessed = [];
function arrowKeyMovement(key) {
  console.log(key);
  let active = document.getElementsByClassName("active")[0];
  document.getElementById(active.id).classList.remove("active");
  let activeIdtoInt = parseInt(active.id, 16);
  console.log(activeIdtoInt);
  switch (key) {
    case "ArrowRight":
      activeIdtoInt++;
      break;
    case "ArrowLeft":
      activeIdtoInt--;
      break;
    case "Enter":
      getBlock(active.id);
      break;
    default:
      break;
  }
  if (activeIdtoInt >= gridCount) activeIdtoInt = 0;
  if (activeIdtoInt < 0) activeIdtoInt = gridCount - 1;
  let currentActiveId = activeIdtoInt.toString(16);
  console.log(currentActiveId);
  document.getElementById(currentActiveId).classList.add("active");
}
function randomized() {
  return Math.ceil(Math.random() * gridCount) - 1;
}
function randomColorsGenerator() {
  while (randomizedColors.length < gridCount) {
    let random = randomized();
    let inArr = false;
    randomizedColors.forEach((element) => {
      if (random === element) inArr = true;
    });
    !inArr && randomizedColors.push(random);
  }
}
function colorBoard() {
  let pos = 0;
  randomizedColors.forEach((element) => {
    let block = document.getElementById(pos.toString(16));
    block.style.backgroundColor = colors[randomizedColors[element]].value;
    block.innerHTML = colors[randomizedColors[element]].color;
    block.style.color = colors[randomizedColors[element]].textColor;
    pos++;
  });
}
function uncolorBoard() {
  let pos = 0;
  randomizedColors.forEach((element) => {
    let block = document.getElementById(pos.toString(16));
    if (pos === 0) {
      block.classList.add("active");
    }
    block.style.backgroundColor = "aliceblue";
    block.innerHTML = "";
    pos++;
  });
}
function colorToGuess() {
  if (guessed.length < gridCount) {
    let currentToFind = randomized();
    let isGuessed = false;
    // console.log(colors[currentToFind].color);
    guessed.forEach((element) => {
      console.log("guess");
      console.log(currentToFind);
      console.log(element);
      if (currentToFind === element) isGuessed = true;
    });
    if (!isGuessed) {
      toFind = currentToFind;
      guessed.push(toFind);
      console.log(guessed);
      document.getElementById("counter").innerHTML =
        colors[currentToFind].color;
      document.getElementById("counter").style.backgroundColor =
        colors[currentToFind].value;
      document.getElementById("counter").style.textTransform = "uppercase";
      document.getElementById("counter").style.color =
        colors[currentToFind].textColor;
    } else {
      colorToGuess();
    }
  } else {
    gameOver();
  }
}
function generateGameBoard(gridCount) {
  console.log("level: " + gridCount);
  let gameZone = document.getElementById("game-zone");
  gameZone.innerHTML = "";
  for (let index = 0; index < gridCount; index++) {
    let div = document.createElement("div");
    div.classList.add("block");
    div.id = index.toString(16);
    div.setAttribute("onclick", "getBlock(this.id)");
    if (gridCount === 16) {
      div.classList.add("block16");
    } else if (gridCount === 9) {
      div.classList.add("block9");
    } else if (gridCount === 4) {
      div.classList.add("block4");
    }
    gameZone.appendChild(div);
  }

  randomColorsGenerator();
  let pos = 0;
  colorBoard();
  let i = 0,
    countDownTime = 4;
  const counter = setInterval(() => {
    console.log(i++);
    if (countDownTime - i <= 3) {
      document.getElementById("counter").style.visibility = "visible";
      document.getElementById("counter").innerHTML = countDownTime - i;
    }
  }, 1000);
  setTimeout(() => {
    clearInterval(counter);
    uncolorBoard();
    if (guessed.length < gridCount) colorToGuess();
  }, 1000 * countDownTime);
}

function gameOver() {
  let gameOverDisplay = document.getElementById("game-over");
  let finalScore = document.getElementById("final-score");
  finalScore.innerHTML = score;
  gameOverDisplay.style.visibility = "visible";
}

function getBlock(clickedId) {
  clickedId = parseInt(clickedId, 16);
  console.log(colors[clickedId].color);
  console.log(colors[toFind].color);
  if (clickedId === toFind) {
    clickedId = clickedId.toString(16);
    document.getElementById(clickedId).style.backgroundColor =
      colors[toFind].value;
    score += 10;
    colorToGuess();
    document.getElementById("score").innerHTML = score;
  } else {
    gameOver();
  }
}

function newGame(event) {
  event.preventDefault(); //prevents the default action of an event eg in this case prevent form submit action
  toFind, (score = 0), (gameOverStatus = false);
  (randomizedColors = []), (guessed = []);
  let newLevel = document.getElementById("levels").value;
  let gameOverDisplay = document.getElementById("game-over");
  gameOverDisplay.style.visibility = "hidden";
  document.getElementById("score").innerHTML = score;
  document.getElementById("counter").style.color = "rgba(205, 244, 244, 0.8)";
  document.getElementById("counter").innerHTML = "Color Me Right";
  switch (newLevel) {
    case "1":
      gridCount = 4;
      break;
    case "2":
      gridCount = 9;
      break;
    case "3":
      gridCount = 16;
      break;

    default:
      break;
  }
  console.log(`new level: ${newLevel === "3"}`);
  console.log(`grid count: ${gridCount}`);
  generateGameBoard(gridCount);
}

// capture keydown occuring anywhere on the window. Keypress is deprecated, use Keydown as it captures all keys
document.body.addEventListener("keydown", (event) =>
  arrowKeyMovement(event.code)
);
generateGameBoard(gridCount);
