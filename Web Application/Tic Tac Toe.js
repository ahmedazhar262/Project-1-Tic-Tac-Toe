const player1Input = document.getElementById("player1");
const player2Input = document.getElementById("player2");
const board = document.getElementById("board");
const message = document.getElementById("message");
const resetButton = document.getElementById("reset");

let currentPlayer = "X";
let isGameActive = true;
let player1Name = "Player 1";
let player2Name = "Player 2";

function createCell() {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.addEventListener("click", handleCellClick);
    return cell;
}

function handleCellClick() {
    const cell = this;
    if (!isGameActive || cell.textContent !== "") return;

    cell.textContent = currentPlayer;
    cell.style.backgroundColor = "darkgray"; // Cell background color
    togglePlayer();
    checkWinner();
}

function togglePlayer() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
}

function checkWinner() {
    const cells = document.querySelectorAll(".cell");
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (cells[a].textContent && cells[a].textContent === cells[b].textContent && cells[a].textContent === cells[c].textContent) {
            isGameActive = false;
            cells[a].style.backgroundColor = "green";
            cells[b].style.backgroundColor = "green";
            cells[c].style.backgroundColor = "green";
            message.textContent = `${currentPlayer === "X" ? player2Name : player1Name} wins!`;
            return;
        }
    }

    if ([...cells].every(cell => cell.textContent !== "")) {
        isGameActive = false;
        message.textContent = "It's a draw!";
    }
}

function resetGame() {
    currentPlayer = "X";
    isGameActive = true;
    player1Name = player1Input.value || "Player 1";
    player2Name = player2Input.value || "Player 2";
    message.textContent = "";
    board.innerHTML = "";
    for (let i = 0; i < 9; i++) {
        const cell = createCell();
        board.appendChild(cell);
    }
}

player1Input.addEventListener("input", () => {
    player1Name = player1Input.value || "Player 1";
});

player2Input.addEventListener("input", () => {
    player2Name = player2Input.value || "Player 2";
});

resetButton.addEventListener("click", resetGame);

resetGame();
