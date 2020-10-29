const statut = document.querySelector('h2');
let playable = true;
let player = "X";
let targetSquare = ["", "", "", "", "", "", "", "", "", ]
const winningRows = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
const win = () => `Le joueur ${player} a gagné`
const draw = () => "Match nul"
const playerTurn = () => `C'est au tour du joueur ${player}`

statut.innerHTML = playerTurn();

function selectedSquare() {
    console.log('this', this);
    console.log(this.dataset.indexNumber);
    const indexCase = parseInt(this.dataset.indexNumber)

    if (targetSquare[indexCase] != "" || !playable) {
        return
    }

    targetSquare[indexCase] = player
    console.log('tableau=', targetSquare)
    this.innerHTML = player

    verification()
}

function verification() {
    let winningTurn = false;

    for (let winningRow of winningRows) {
        let val1 = targetSquare[winningRow[0]]
        let val2 = targetSquare[winningRow[1]]
        let val3 = targetSquare[winningRow[2]]

        if (val1 == "" || val2 == "" || val3 == "") {
            continue
        }
        if (val1 == val2 && val2 == val3) {
            winningTurn = true;
            break;
        }
    }
    if (winningTurn) {
        statut.innerHTML = win();
        playable = false;
        return;
    }

    if (!targetSquare.includes("")) {
        statut.innerHTML = draw();
        playable = false;
        return;
    }

    player = player == "X" ? "O" : "X"
    statut.innerHTML = playerTurn()
}

function reset() {
    player = "X";
    playable = true;
    targetSquare = ["", "", "", "", "", "", "", "", "", ];
    statut.innerHTML = playerTurn();
    document.querySelectorAll('.case').forEach(square => square.innerHTML = "")
}

document.querySelectorAll(".case").forEach(square => square.addEventListener('click', selectedSquare))
document.querySelector("#reset").addEventListener('click', reset)