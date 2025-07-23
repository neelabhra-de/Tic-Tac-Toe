let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGamebtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true; // Player is "O", Computer is "X"

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

const resetGame = () => {
  turnO = true;
  enableBoxes();
  msgContainer.classList.add("hide");
};

const disableBoxes = () => {
  boxes.forEach((box) => {
    box.disabled = true;
  });
};

const enableBoxes = () => {
  boxes.forEach((box) => {
    box.disabled = false;
    box.innerText = "";
  });
};

const showWinner = (winner) => {
  msg.innerText = winner === "Draw" ? "It's a Draw!" : `Congratulations, WINNER is ${winner}`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

const checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos1 = boxes[pattern[0]].innerText;
    let pos2 = boxes[pattern[1]].innerText;
    let pos3 = boxes[pattern[2]].innerText;

    if (pos1 !== "" && pos2 !== "" && pos3 !== "") {
      if (pos1 === pos2 && pos2 === pos3) {
        showWinner(pos1);
        return true;
      }
    }
  }

  // Check for draw
  let filled = true;
  boxes.forEach((box) => {
    if (box.innerText === "") filled = false;
  });

  if (filled) {
    showWinner("Draw");
    return true;
  }

  return false;
};

const getBestMove = (symbol) => {
  for (let pattern of winPatterns) {
    let [a, b, c] = pattern;
    let values = [boxes[a].innerText, boxes[b].innerText, boxes[c].innerText];
    let countSymbol = values.filter(v => v === symbol).length;
    let countEmpty = values.filter(v => v === "").length;

    if (countSymbol === 2 && countEmpty === 1) {
      if (boxes[a].innerText === "") return a;
      if (boxes[b].innerText === "") return b;
      if (boxes[c].innerText === "") return c;
    }
  }
  return -1;
};

const computerMove = () => {
  let bestMove = getBestMove("X"); // Try to win
  if (bestMove === -1) {
    bestMove = getBestMove("O"); // Try to block
  }
  if (bestMove === -1 && boxes[4].innerText === "") {
    bestMove = 4; // Take center
  }
  if (bestMove === -1) {
    let empty = [];
    boxes.forEach((box, i) => {
      if (box.innerText === "") empty.push(i);
    });
    bestMove = empty[Math.floor(Math.random() * empty.length)];
  }

  if (bestMove !== -1) {
    boxes[bestMove].innerText = "X";
    boxes[bestMove].disabled = true;
    checkWinner();
    turnO = true;
  }
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (box.innerText !== "" || !turnO) return;

    box.innerText = "O";
    box.disabled = true;
    let result = checkWinner();
    turnO = false;

    if (!result) {
      setTimeout(() => {
        computerMove();
      }, 500);
    }
  });
});

newGamebtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
