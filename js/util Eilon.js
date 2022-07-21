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
    console.log('Mine locations: ', rands)

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
            minesAroundcount: '*',
            isShown: false,
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
            strHTML += `<td class="${className}" onClick="cellClicked(this, ${i}, ${j})" oncontextmenu="getRightClick(this)" >${cell}</td>`
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


// location such as: {i: 2, j: 7}
function renderCell(location, value) {
    // Select the elCell and set the value
    const elCell = document.querySelector(`.cell-${location.i}-${location.j}`)
    elCell.innerHTML = value
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min
}

//returns current time HH:MM
function getTime() {
    return new Date().toString().split(' ')[4];
}

//returns timer from 0 seconds 
function getTimer() {

    //add gElapsed in main and gStartingTime =  Date.now()
    gElapsed = Date.now() - gStartingTime
    gElapsed = Math.floor(gElapsed /= 1000)
    var elBoxes = document.getElementsByClassName('timer')
    elBoxes[0].innerText = 'Timer: ' + gElapsed

}


function startTimer() {
    gInter = setInterval(getTimer, 1000)
}

function stopTimer() {

    clearInterval(gInter)
}

