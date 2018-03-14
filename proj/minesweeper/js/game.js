
'use strict';

console.log('Minesweeper');

var gBoard;

var gSelectedCell = null;

var gLevel;

var gState;

var totalNums;


function playGame(size, mines) {

    gLevel = {
        SIZE: size,
        MINES: mines
    };

    gState = {
        isGameOn: false,
        shownCount: 0,
        markedCount: 0,
        secsPassed: 0
    };

    gState.isGameOn = true;
    startGame(size, mines);
}

function startGame(size, mines) {
    totalNums = (size ** 2) - mines;
    gBoard = buildBoard(size, mines);
    renderBoard(gBoard);
}

function buildBoard(size, mines) {
    var random = randomX(size, mines);
    var board = [];
    for (var i = 0; i < size; i++) {
        board[i] = [];
        for (var j = 0; j < size; j++) {
           var num = random.splice(0, 1);
            board[i][j] = num[0];
        }
    }
    console.table(board);
    setMinesNegsCount(board);
    console.table(board);
    return board;
}


function setMinesNegsCount(board) {
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board.length; j++) {
            var count = countMines(board, i, j);
            if (count > 0 && board[i][j] !== 'x') board[i][j] = count;
        }
    }
}

function countMines(board, row, col) {
    var count = 0;
    var rowIdx = (row - 1 >= 0) ? row - 1 : row;
    var colIdx = (col - 1 >= 0) ? col - 1 : col;
    var rowEnd = (row + 1 < board.length) ? row + 1 : row;
    var colEnd = (col + 1 < board.length) ? col + 1 : col;
    for (rowIdx; rowIdx <= rowEnd; rowIdx++) {
        for (var i = colIdx; i <= colEnd; i++) {
            if (board[rowIdx][i] === 'x') count++;
        }
    }
    return count;
}

function renderBoard(board) {
    var strHtml = '';
    for (var i = 0; i < board.length; i++) {
        strHtml += '<tr>';
        for (var j = 0; j < board[0].length; j++) {
            var tdId = 'cell-' + i + '-' + j;
            var item = board[i][j];
            var className = (item === 'x') ? 'mine' : 'num'
            strHtml += '<td id="' + tdId + '" onclick="cellClicked(this, ' +
                i + ',' + j + ')" oncontextmenu = "rightClicked(this, ' +
                i + ',' + j + ')" class="' + 'className' + '">'
            strHtml += '';
            strHtml += '</td>'
        }
        strHtml += '</tr>';
    }
    var elTblNums = document.querySelector('.board');
    elTblNums.innerHTML = strHtml
}


// click on mouse
function cellClicked(elCell, cellI, cellJ) {

    if (gSelectedCell) {
        // gSelectedCell.classList.remove('selected');
        gSelectedCell = null;
        // removeMarkedCells();
    }
    
    if (gState.isGameOn) {
        elCell.classList.add('selected');
        var curr = gBoard[cellI][cellJ];
        elCell.innerHTML = curr;
        if (curr >= 0 && curr <= 9) markCellsForNums(cellI, cellJ);
        if (curr === null) markCellsForNull(cellI, cellJ);
        if (curr === 'x') markCellsForMine(cellI, cellJ);
    }
    if (gameOver()) gState.isGameOn = false;
}

// right click on suspected mines
function rightClicked(elCell, cellI, cellJ) {

    if (elCell.classList.contains('flagged')) {
        elCell.classList.remove('flagged');
        elCell.innerHTML = '';
        if (gBoard[cellI][cellJ] === 'x') {
            gState.markedCount--;
        }
        return;
    }

    elCell.classList.add('flagged');
    elCell.innerHTML = '⚑';
    if (gBoard[cellI][cellJ] === 'x') {
        gState.markedCount++;
    }
    if (gameOver()) gState.isGameOn = false;
}

// give class mark for empty cells
function markCellsForNums(cellI, cellJ) {
    var selector = '#cell-' + cellI + '-' + cellJ;
    var elCell = document.querySelector(selector);
    if (!elCell.classList.contains('mark')) {
        elCell.classList.add('mark');
        gState.shownCount++;
    }
}


//expend function 2 level cells
function markCellsForNull(row, col) {

    var idxI = (row - 2 >= 0) ? row - 2 : (row - 1 >= 0) ? row - 1 : row;
    var idxJ = (col - 2 >= 0) ? col - 2 : (col - 1 >= 0) ? col - 1 : col;
    var endI = (row + 2 < gBoard.length) ? row + 2 : (row + 1 < gBoard.length) ? row + 1 : row;
    var endJ = (col + 2 < gBoard.length) ? col + 2 : (col + 1 < gBoard.length) ? col + 1 : col;
    for (var i = idxI; i <= endI; i++) {
        for (var j = idxJ; j <= endJ; j++) {
            if (gBoard[i][j] === 'x' || gBoard[i][j] === '⚑') continue;
            var selector = '#cell-' + i + '-' + j;
            var elCell = document.querySelector(selector);
            if (!elCell.classList.contains('mark')) {
                elCell.classList.add('mark');
                gState.shownCount++;
            }
            if (gBoard[i][j] !== null) {
                var curr = gBoard[i][j];
                elCell.innerHTML = curr;
            }
        }
    }
}


//check for mines
function markCellsForMine(cellI, cellJ) {
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            var selector = '#cell-' + i + '-' + j;
            var elCell = document.querySelector(selector);
            if (gBoard[i][j] === 'x') {
                var curr = gBoard[i][j];
                elCell.innerHTML = curr;
            }
        }
    }
    gState.isGameOn = false;
    alert('game over');
}


//check if game over
function gameOver() {
    if ((totalNums === gState.shownCount) && (gLevel.MINES === gState.markedCount)) {
        alert('good job');
        return true;
    }
    else return false;
}

//create x cells in random places
function randomX(size, mines) {
    var random = [];
    var count = mines;
    for (var i = 0; i < size * size; i++) {
       if (count > 0){
        random [i] = 'x';
        count -- ;
       }
      else random [i] = null ;
    }
    shuffle(random);
    return random;
}

//cancel open menu on right click
window.oncontextmenu = function () {
    return false;
}