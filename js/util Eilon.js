function buildBoard() {
    var mat = []
    var rands = []
    console.log()

    // create objects with random numbers [{i,j},{i,j}]...
    for (var i = 0; i < gMineCount; i++) {
        rands.push(random = {
            i: getRandomInt(0, 4),
            j: getRandomInt(0, 4)
        })
        rands.push[random]
    }
    console.log('Mine locations: ',rands)

    for (var i = 0; i < gRows; i++) {
        mat.push([])

        for (var j = 0; j < gCols; j++) {

            mat[i][j] = cell = {
                type: BLANK,
                minesAroundcount: 4,
                isShown: false,
                isMine: false,
                isMarked: false
            }
        }
    }

    for (var i = 0; i < gMineCount; i++) {
        mat[rands[i].i][rands[i].j] = cell = {
            type: MINE,
            minesAroundcount: -1,
            isShown: true,
            isMine: true,
            isMarked: false
        }
    }

    return mat
}
function renderBoard(mat, selector) {

    var strHTML = '<table border="0"><tbody>'
    for (var i = 0; i < mat.length; i++) {

        strHTML += '<tr>'
        for (var j = 0; j < mat[0].length; j++) {

            const cell = mat[i][j].minesAroundcount
            const className = 'cell cell-' + i + '-' + j
            strHTML += `<td class="${className}" onClick="cellClicked(this, ${i}, ${j})">${cell}</td>`
        }
        strHTML += '</tr>'
    }
    strHTML += '</tbody></table>'

    const elContainer = document.querySelector(selector)
    elContainer.innerHTML = strHTML
}

function countNeighbors(cellI, cellJ, mat) {
    var neighborsCount = 0;

    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= mat.length) continue;

        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (i === cellI && j === cellJ) continue;
            if (j < 0 || j >= mat[i].length) continue;
            if (mat[i][j].isShow || mat[i][j].isMine) neighborsCount++;
        }
    }
    return neighborsCount;
}

function createMat(ROWS, COLS) {
    var mat = []
    for (var i = 0; i < ROWS; i++) {
        var row = []
        for (var j = 0; j < COLS; j++) {
            row.push('')
        }
        mat.push(row)
    }
    return mat
}

//print the mat to the DOM with classes and cell names
function printMat(mat, selector) {

    var strHTML = '<table border="0"><tbody>'
    for (var i = 0; i < mat.length; i++) {

        strHTML += '<tr>'
        for (var j = 0; j < mat[0].length; j++) {

            const cell = mat[i][j]
            const className = `cell cell-${i}-${j}`

            strHTML += `<td class="${className}">${cell}</td>`
        }
        strHTML += '</tr>'
    }
    strHTML += '</tbody></table>'

    const elContainer = document.querySelector(selector)
    elContainer.innerHTML = strHTML
}

// location such as: {i: 2, j: 7}
function renderCell(location, value) {
    // Select the elCell and set the value
    const elCell = document.querySelector(`.cell-${location.i}-${location.j}`)
    elCell.innerHTML = value
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function generateRandomColor() {
    var randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
    return randomColor;
    //random color will be freshly served
}

//build board with surrounding walls
function buildBoard1() {
    const size = 10
    const board = []

    for (var i = 0; i < size; i++) {
        board.push([]) // board[i] = []

        for (var j = 0; j < size; j++) {
            board[i][j] = '*'

            if (i === 0 || i === size - 1 ||
                j === 0 || j === size - 1) {
                board[i][j] = 'X'
            }
        }
    }
    return board
}



function isEmptyCell(coord) {
    return gBoard[coord.i][coord.j] === ''
}

//returns current time HH:MM
function getTime() {
    return new Date().toString().split(' ')[4];
}

//returns timer from 0 seconds 
function getTimer() {

    //add gElapsed in main and gStartingTime =  Date.now()

    gElapsed = Date.now() - gStartingTime
    gElapsed = Math.floor(gElapsed/=1000)
    var elBoxes = document.getElementsByClassName('timer')
    elBoxes[0].innerText = 'Timer: ' + gElapsed
}


function startTimer() {
    gInter = setInterval(getTimer,1000)
}

function stopTimer() {
    clearInterval(gInter)
}

