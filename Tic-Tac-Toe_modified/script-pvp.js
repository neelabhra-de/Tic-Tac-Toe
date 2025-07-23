let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGamebtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");




let turnO = true;

const winPatterns = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8],
];


const resetGame = () => {
    turnO = true;
    enableBoxes();
    msgContainer.classList.add("hide");
}





boxes.forEach((box) => {
    box.addEventListener("click", () => {
        console.log("box was clicked");
        if (turnO) {
            box.innerText = "O";
            turnO = false;
        }
        else{
            box.innerText = "X";
            turnO = true;
        }
        box.disabled = true;

        checkWinner();

    });
});


const disableBoxes = () => {
    for(let box of boxes){
        box.disabled = true;
    }
}
const enableBoxes = () => {
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
}


const showWinner = (winner) => {
    msg.innerText = `Congratulations, WINNER is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
}


// const checkWinner = () => {
//     for (let pattern of winPatterns){
        
//         let pos1value = boxes[pattern[0]].innerText;
//         let pos2value = boxes[pattern[1]].innerText;
//         let pos3value = boxes[pattern[2]].innerText;

//         if (pos1value != "" && pos2value != "" && pos3value != ""){
//             if(pos1value === pos2value && pos2value === pos3value){
//                 console.log("WINNER", pos1value);
//                 showWinner(pos1value);
//             }
//         }

//     }
// }



const checkWinner = () => {
    let winnerFound = false;

    for (let pattern of winPatterns){
        let pos1value = boxes[pattern[0]].innerText;
        let pos2value = boxes[pattern[1]].innerText;
        let pos3value = boxes[pattern[2]].innerText;

        if (pos1value !== "" && pos2value !== "" && pos3value !== "") {
            if (pos1value === pos2value && pos2value === pos3value) {
                showWinner(pos1value);
                winnerFound = true;
                return; // exit early if winner found
            }
        }
    }

    // If no winner and all boxes are filled → it's a draw
    let isDraw = true;
    boxes.forEach((box) => {
        if (box.innerText === "") {
            isDraw = false;
        }
    });

    if (!winnerFound && isDraw) {
        msg.innerText = "It's a Draw!";
        msgContainer.classList.remove("hide");
        disableBoxes();
    }
}


newGamebtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);