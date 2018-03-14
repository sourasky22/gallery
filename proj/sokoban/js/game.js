
var WALL = 'x';
var FLOOR = ' ';
var BOX = '☐';
var PLAYER = '웃';
var GAME_SIZE = 8;
var gBoard;
var gSelectedCell;
var gPlayerPos;


restartGame();
function restartGame() {
    gBoard = buildBoard();
    renderBoard(gBoard);
}

function buildBoard() {
    var board = [];
    for (var i = 0; i <= GAME_SIZE; i++) {
        board[i] = [];
        for (var j = 0; j <= GAME_SIZE; j++) {

            board[i][j] = ' ';
        }
    }

    //insert player
    board[2][2] = PLAYER;
    gPlayerPos = {
        i: 2,
        j: 2
    }

    //insert walls
    for (var i = 0; i <= GAME_SIZE; i++) {
        board[0][i] = WALL;
        board[GAME_SIZE][i] = WALL;
        board[i][0] = WALL;
        board[i][GAME_SIZE] = WALL;
    }
    for (var i = 0; i <= 5; i++) {
        board[i][6] = WALL;
        board[i][7] = WALL;
    }

    board[1][1] = WALL;
    board[1][2] = WALL;
    board[3][1] = WALL;
    board[3][2] = WALL;
    board[4][2] = WALL;
    board[4][3] = WALL;
    board[5][2] = WALL;

    //insert boxes 
    board[2][3] = BOX;
    board[3][4] = BOX;
    board[4][4] = BOX;
    board[6][1] = BOX;
    board[6][3] = BOX;
    board[6][4] = BOX;
    board[6][5] = BOX;


    console.table(board);
    return board;

}


function renderBoard(board) {
    var strHtml = '';
    for (var i = 0; i < board.length; i++) {
        var row = board[i];
        strHtml += '<tr>';
        for (var j = 0; j < row.length; j++) {
            var cell = row[j];
            var className = 'cell';
            var tdId = 'cell-' + i + '-' + j;
            strHtml += '<td id="' + tdId + '" onclick="cellClicked(this, ' +
                i + ',' + j + ')" onmouseover="cellHover(this, ' +
                i + ',' + j + ')"  class="' + className + '">' + cell + '</td>';
        }
        strHtml += '</tr>';
    }
    var elMat = document.querySelector('.board');
    elMat.innerHTML = strHtml;
    addTargets();
}

function cellClicked(elCell, cellI, cellJ) {

    var selector = '#cell-' + gPlayerPos.i + '-' + gPlayerPos.j;
    var elPlayer = document.querySelector(selector);

    if (elCell.classList.contains('floor_mark')) {
        movePiece(elPlayer, elCell);
        cleanBoard();
        return;
    }
    else if (elCell.classList.contains('box_mark')) {
        var box = boxMove(elCell);
        if (box) movePiece(elPlayer, elCell);
        isGameOver();
        cleanBoard();
        return;
    }

}

function cellHover(elCell, cellI, cellJ) {

    if (gSelectedCell) {
        // gSelectedCell.classList.remove('selected');
        gSelectedCell = null;
        removeMarkedCells();
    }

    gSelectedCell = elCell;
    // elCell.classList.add('selected');
    var piece = elCell.innerHTML;
    switch (piece) {
        case ' ':
            markCellsForPlayerMove(cellI, cellJ);
            break;
        // option for another marks
        case 'o':
            markCellsForPlayerMove(cellI, cellJ);
            break;
        case '☐':
            markCellsForPlayerMove(cellI, cellJ);
            break;
    }

}

// show player posible movment directions
function markCellsForPlayerMove(cellI, cellJ) {
    var selector;
    var curr = gBoard[cellI][cellJ];
    if (cellI - 1 >= 0 && (gBoard[cellI - 1][cellJ] === '웃')) {
        selector = '';
        if (curr === ' ') markCellFloor(selector, cellI, cellJ);
        else if (curr === '☐') markCellBox(selector, cellI, cellJ);
    }
    else if (cellJ - 1 >= 0 && (gBoard[cellI][cellJ - 1] === '웃')) {
        selector = '';
        if (curr === ' ') markCellFloor(selector, cellI, cellJ);
        else if (curr === '☐') markCellBox(selector, cellI, cellJ);
    }
    else if (cellI + 1 <= GAME_SIZE && (gBoard[cellI + 1][cellJ] === '웃')) {
        selector = '';
        if (curr === ' ') markCellFloor(selector, cellI, cellJ);
        else if (curr === '☐') markCellBox(selector, cellI, cellJ);
    }
    else if (cellJ + 1 <= GAME_SIZE && (gBoard[cellI][cellJ + 1] === '웃')) {
        selector = '';
        if (curr === ' ') markCellFloor(selector, cellI, cellJ);
        else if (curr === '☐') markCellBox(selector, cellI, cellJ);
    }
}

//mark choosen floor cell
function markCellFloor(selector, cellI, cellJ) {
    var selector = '#cell-' + cellI + '-' + cellJ;
    var elCell = document.querySelector(selector);
    elCell.classList.add('floor_mark');
}

function markCellBox(selector, cellI, cellJ) {
    var selector = '#cell-' + cellI + '-' + cellJ;
    var elCell = document.querySelector(selector);
    elCell.classList.add('box_mark');
}

//unmark choosen floor cell
function removeMarkedCells() {
    var elMarkedCells = document.querySelectorAll('.floor_mark , .box_mark');
    for (var i = 0; i < elMarkedCells.length; i++) {
        var markedCell = elMarkedCells[i];
        markedCell.classList.remove('floor_mark', 'box_mark');
    }
}


function cleanBoard() {
    var elCells = document.querySelectorAll(' .selected, .floor_mark');
    for (var i = 0; i < elCells.length; i++) {
        elCells[i].classList.remove('selected', 'floor_mark');
    }
}

function movePiece(elFromCell, elToCell) {

    var fromCoord = getCellCoord(elFromCell.id);
    var toCoord = getCellCoord(elToCell.id);
    var piece = gBoard[fromCoord.i][fromCoord.j];

    // Update the Model
    gBoard[fromCoord.i][fromCoord.j] = ' ';
    gBoard[toCoord.i][toCoord.j] = piece;
    gPlayerPos.i = toCoord.i;
    gPlayerPos.j = toCoord.j;
    // Update the DOM
    elToCell.innerText = piece;
    elFromCell.innerText = ' ';
}

function getCellCoord(strCellId) {
    var coord = {};
    coord.i = +strCellId.substring(5, strCellId.lastIndexOf('-'));
    coord.j = +strCellId.substring(strCellId.lastIndexOf('-') + 1);
    // console.log('coord', coord);
    return coord;
}


function boxMove(elFromCell) {
    var boxCoord = getCellCoord(elFromCell.id);
    var cellI = boxCoord.i;
    var cellJ = boxCoord.j;
    if ((gBoard[cellI - 1][cellJ] === '웃') && (gBoard[cellI + 1][cellJ] === ' ')) {
        var selector = '#cell-' + (cellI + 1) + '-' + cellJ;
        var elToCell = document.querySelector(selector);
        movePiece(elFromCell, elToCell);
        return true;
    }
    else if ((gBoard[cellI + 1][cellJ] === '웃') && (gBoard[cellI - 1][cellJ] === ' ')) {
        var selector = '#cell-' + (cellI - 1) + '-' + cellJ;
        var elToCell = document.querySelector(selector);
        movePiece(elFromCell, elToCell);
        return true;
    }
    else if ((gBoard[cellI][cellJ - 1] === '웃') && (gBoard[cellI][cellJ + 1] === ' ')) {
        var selector = '#cell-' + cellI + '-' + (cellJ + 1);
        var elToCell = document.querySelector(selector);
        movePiece(elFromCell, elToCell);
        return true;
    }
    else if ((gBoard[cellI][cellJ + 1] === '웃') && (gBoard[cellI][cellJ - 1] === ' ')) {
        var selector = '#cell-' + cellI + '-' + (cellJ - 1);
        var elToCell = document.querySelector(selector);
        movePiece(elFromCell, elToCell);
        return true;
    }
    else false;
}


function addTargets(){
    var targets = [
        '#cell-' + 2 + '-' + 1,
        '#cell-' + 3 + '-' + 5,
        '#cell-' + 4 + '-' + 1,
        '#cell-' + 5 + '-' + 4,
        '#cell-' + 6 + '-' + 6,
        '#cell-' + 7 + '-' + 4,
        '#cell-' + 6 + '-' + 3,
    ]
    for (var i = 0; i < targets.length; i++){
        var elCell = document.querySelector(targets[i]);
        elCell.classList.add('targets');
    }
}

function isGameOver(){
    var elCells = document.querySelectorAll('.targets');
    var gameOver = true;
    for (var i = 0; i < elCells.length; i++){
       if(elCells[i].innerHTML !== '☐') gameOver = false;
    }
    if (gameOver) alert('good job');
}
