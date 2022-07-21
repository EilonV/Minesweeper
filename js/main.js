const NUMBER = 0
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
    checkGameOver()
    renderBoard(gBoard, '.board')
    console.log(gBoard)
    setMinesNegsCount()
}

function changeDifficutly(getDiff) {
    gRows = +getDiff.value
    gCols = +getDiff.value
    if (getDiff.value == 4)
        gMineCount = 2
    else if (getDiff.value == 8)
        gMineCount = 12
    else if (getDiff.value == 12)
        gMineCount = 30
    init()
    console.log('gMineCount ', gMineCount)

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
        //changes the appearance of clicked cell and shows its content
        if (!gBoard[i][j].isMarked) {

            gBoard[i][j].isShown = true
            elCell.classList.add('clicked')
            elCell.style.fontSize = '20px'

            changeNeighbors(i, j, gBoard)

            if (gBoard[i][j].isMine) {

                // if a mine is clicked: display all mines
                for (var row = 0; row < gRows; row++) {
                    for (var col = 0; col < gCols; col++) {
                        var mineSelector = document.querySelector(` .cell-${row}-${col}`)
                        if (gBoard[row][col].isMine) {
                            gBoard[row][col].isShown = true
                            mineSelector.classList.add('clicked')
                            mineSelector.style.fontSize = '20px'
                            gGame.isOn = false
                        }
                    }
                }
            }
            console.log(gBoard)

            //starts timer when clicking on a non-mine
            if (!gBoard[i][j].isMine) {
                gGame.timerStart++
                if (gGame.timerStart < 2) {
                    getTimer()
                    startTimer()
                }
            } //stops the timer when clicking on a mine
            else {
                clearInterval(gInter)
                gElapsed = 0
                gGame.timerStart = 0
                gGame.isOn = false
            }
        }
    }
    checkGameOver()
}

//cellmarked 
function getRightClick(el) {
    console.log(el.classList[1])
    var text = ''
    text = el.classList[1].split('-')
    text.splice(0, 1) //leave an array.length = 2 ---> [0]=i [1]=j
    console.log(text)
    if (gGame.isOn) {

        if (el.innerHTML !== '🚩') {
            gBoard[text[0]][text[1]].isMarked = true
            el.innerText = '🚩'
            el.style.fontSize = '20px'
        }
        else {
            el.style.fontSize = '0px'
            el.innerText = gBoard[text[0]][text[1]].minesAroundcount
            console.log('Inner text: ', gBoard[text[0]][text[1]])
            gBoard[text[0]][text[1]].isMarked = false

        }

        console.log(gBoard)
        checkGameOver()
    }
}


function checkGameOver() {
    var mineMarkCount = 0
    var markedBoxesCount = 0
    var elGameMsg = document.querySelector('.gameStatus')

    var numCellCount = Math.pow(gBoard.length, 2) - gMineCount

    if (gGame.isOn) {
        for (var i = 0; i < gBoard.length; i++) {
            for (var j = 0; j < gBoard[0].length; j++) {
                if (gBoard[i][j].isShown)
                    markedBoxesCount++
                if (gBoard[i][j].isMarked && gBoard[i][j].isMine)
                    mineMarkCount++
            }
        }
    }
    if (mineMarkCount === gMineCount && markedBoxesCount === numCellCount) {
        gGame.isOn = false
        elGameMsg.innerTet = '🏆 YOU WIN 🏆'
        elGameMsg.style.display = 'block'
    }
    else if (!gGame.isOn) {
        elGameMsg.innerText = '💣 YOU LOSE 💣'
        elGameMsg.style.display = 'block'
    }
    console.log('markedBoxesCount: ', markedBoxesCount)
}


