let modal = document.getElementById("my_modal");
let startGame = document.getElementById("start_game");
let input1, input2, currentPlayer;
let winner = false;

const GameBoard = (() => {
  let square = document.getElementsByClassName("square");
  let board = ["", "", "", "", "", "", "", "", ""];

  const registerMark = () => {
    const squares = document.getElementsByClassName("square");

    const clickedSquare = (e) => {
      let boardId = e.target.id;
      let checkLoc = document.getElementById(boardId).textContent;

      if (checkLoc == "") {
        board[e.target.id] = currentPlayer.mark;
        document.getElementById(boardId.toString()).innerHTML =
          currentPlayer.mark;
        console.log(board);
        checkWinner();
        GameDisplay.onPlay();
        switchPlayer();
        //checkTie();
        //CHECKWINNER ----------------------------------------------
        // Get ID of Clicked Element
      } else {
        if (!board.includes("")) {
          alert("All Cells occupied and It's a Tie!");
        } else {
          alert("Cell is already Occupied.");
        }
      }
      // get the index of board and change to the mark of the player
      // element is empty
    };
    for (let b of squares) {
      b.addEventListener("click", clickedSquare);
    }
  };

  const checkWinner = () => {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8], // horizontal
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8], // vertical
      [0, 4, 8],
      [2, 4, 6], // diagonal
    ];
    for (let i = 0; i < winningCombinations.length; i++) {
      const [a, b, c] = winningCombinations[i];
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        console.log(currentPlayer.name + " wins!");
        winner = true;
        GameDisplay.onPlay();
        return true;
      }
    }
  };

  const checkTie = () => {
    if (!board.includes("")) {
      console.log("Tie");
    }
  };

  return { registerMark };
})();

const GameDisplay = (() => {
  //Initialize Players
  const init = () => {
    createPlayers();
  };

  //Display Current Player
  const onPlay = () => {
    if (winner === false) {
      document.getElementById(
        "on_play"
      ).innerHTML = `${currentPlayer.name} \'s turn ( ${currentPlayer.mark} )`;
    } else {
      document.getElementById(
        "on_play"
      ).innerHTML = `${currentPlayer.name} WINS with mark ( ${currentPlayer.mark} )`;
    }
  };

  return { init, onPlay };
})();

//factory create player
function createPlayers() {
  const createPlayer = (name, mark) => {
    return { name, mark };
  };

  //CREATED PLAYER OJect
  const p1 = createPlayer(input1, "X");
  const p2 = createPlayer(input2, "O");
  currentPlayer = p1;

  retPlayer = { p1, p2 };
  return { retPlayer };
}

//let players = createPlayers(); // return player objects

function switchPlayer() {
  if (currentPlayer == retPlayer.p2) {
    currentPlayer = retPlayer.p1;
  } else {
    currentPlayer = retPlayer.p2;
  }
}

startGame.onclick = function () {
  input1 = document.getElementById("player_1").value;
  input2 = document.getElementById("player_2").value;
  if (input1 == "" || input2 == "") {
    alert("Please enter Player names");
  } else {
    modal.style.display = "none";
    GameDisplay.init();
    GameDisplay.onPlay();
    GameBoard.registerMark();
  }
};

function resetGame() {
  location.reload();
}

//console.log(checkInput().p1);
