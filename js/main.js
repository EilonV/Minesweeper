const BLANK = 0
const MINE = '*'

var gBoard
var gCols = 4
var gRows = 4
var gMineCount = 2
var gInter
var gElapsed
var gStartingTime = Date.now()

var gGame = {
    isOn: true,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0,
    timerStart: 0
}

function init() {
    gBoard = buildBoard()
    renderBoard(gBoard, '.board')
    setMinesNegsCount()
    console.log(gBoard)
}


function setMinesNegsCount() {
    for (var i = 0; i < gRows; i++) {
        for (var j = 0; j < gCols; j++) {
            if (gBoard[i][j].type !== MINE) {

                gBoard[i][j].minesAroundcount = countNeighbors(i, j, gBoard)
                renderBoard(gBoard, '.board')
                // console.log('Mines: ' + gBoard[i][j].minesAroundcount)
            }
        }
    }
}

function cellClicked(elCell, i, j) {
    // var classSelect = document.querySelector(` .cell-${i}-${j}`)
    if (gGame.isOn) {
        gBoard[i][j].isShown = true
        elCell.classList.add('clicked')
        console.log(gBoard)
        if (!gBoard[i][j].isMine) {
            gGame.timerStart++
            if (gGame.timerStart<2)
                startTimer()
            console.log(`I WAS CLICKED: [${i}][${j}]`)
            console.log('timerStart = '+gGame.timerStart)
        }
        else {
            clearInterval(gInter)
            gElapsed = 0
            gGame.timeStart = 0
            gGame.isOn = false
        }
    }
}

function getRightClick(ev) {

}

function cellMarked(elCell) {

}
