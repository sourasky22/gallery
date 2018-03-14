
var gBoard = createChessBoard();
var gSelectedCell = null;

console.table(gBoard);
renderBoard(gBoard);


function createChessBoard() {
    var board = [];
    for (var i = 0; i < 8; i++) {
        board[i] = [];
        for (var j = 0; j < 8; j++) {
            board[i][j] = ''
        }
    }
    board[6][4] = '♟';
    board[3][2] = '♟';
    board[7][7] = '♜';
    board[6][6] = '♜';
    board[1][5] = '♟'; // white
    board[4][3] = '♞';
    return board;
}

function renderBoard(board) {
    var elBoard = document.querySelector('.board');
    var strHtml = '';
    var isLight = true;
    for (var i = 0; i < board.length; i++) {
        strHtml += '<tr>';
        for (var j = 0; j < board[0].length; j++) {
            var itemColor = (i === 1 && j === 5) ? -1 : 1;
            var cellClass = (isLight) ? 'light' : 'dark'
            cellClass += ' cell-' + i + '-' + j;
            var playerClass = 0;
            isLight = !isLight;
            strHtml += '<td onclick="cellClicked(this, ' + i + ',' + j + ',' + itemColor + ')" class="' + cellClass + '">'
            strHtml += board[i][j];
            strHtml += '</td>'
        }
        isLight = !isLight;
        strHtml += '</tr>\n';
    }

    // console.log(strHtml);
    elBoard.innerHTML = strHtml;
}

function cellClicked(elCell, cellI, cellJ, itemColor) {
    if (gSelectedCell) {
        gSelectedCell.classList.remove('selected');
        gSelectedCell = null;
        removeMarkedCells();
    }
    elCell.classList.add('selected');
    gSelectedCell = elCell;
    var piece = elCell.innerHTML;
    switch (piece) {
        case '♟':
            markCellsForPawn(cellI, cellJ, itemColor);
            break;
        case '♜':
            markCellsForRook(cellI, cellJ, itemColor);
            break;
        case '♞':
            markCellsForKnight(cellI, cellJ, itemColor);
            break;
    }
}

function markCellsForPawn(cellI, cellJ, itemColor) {
    console.log('Pawn In:', cellI, cellJ, itemColor);
    var direction = (itemColor === 1) ? 'up' : 'down';
    var selector = '';

    if (direction === 'up') markCell(selector, (cellI - 1), cellJ);
    else markCell(selector, (cellI + 1), cellJ);

    if (cellI === 6) markCell(selector, (cellI - 2), cellJ);
    console.log(elCell);

}

function markCellsForRook(cellI, cellJ, itemColor) {
    console.log('Rook In:', cellI, cellJ, itemColor);
    var direction = (itemColor === 1) ? 'up' : 'down';
    var selector = '';
    for (var i = cellI; i >= 0; i--) {
        markCell(selector, (cellI - i), cellJ);
    }
    for (var i = cellI + 1; i < gBoard.length; i++) {
        if (gBoard[i][cellJ]) break;
        markCell(selector, i, cellJ);
    }
    for (var j = 1; j <= cellJ; j++) {
        if (gBoard[cellI][cellJ - j]) break;
        selector = '.cell-' + cellI + '-' + (cellJ - j);
        markCell(selector,cellI,(cellJ - j) );

    }
    for (var j = cellJ + 1; j < gBoard.length; j++) {
        if (gBoard[cellI][j]) break;
        markCell(selector, cellI, j);
    }

}

// function markCellsForKnight(cellI, cellJ, itemColor) {
//     console.log('Knight In:', cellI, cellJ, itemColor);
//     var direction = (itemColor === 1) ? 'up' : 'down';
//     var selector = '';
//     for (var i = 2; i >= 0; i--) {
//         markCell(selector, (cellI-i), cellJ);
//     }
//     for (var i = cellI + 1; i < cellI + 3; i++) {
//         if (gBoard[i][cellJ]) break;
//         if (i === cellI +2) || {
//         markCell(selector, i ,(cellJ+1) );
//         }
//     }
//     for (var j = 2; j >= 0; j--) {
//         if (gBoard[cellI][cellJ - j]) break;
//         markCell(selector , cellI,(cellJ - j) );
//         if (j===0){
//         markCell(selector, (cellI+1), (cellJ - j));
//         }
//     }
//     for (var j = cellJ + 1; j < cellJ+3 ; j++) {
//         if (gBoard[cellI][j]) break;
//         markCell(selector , cellI, j );
//     }

// }

function markCell(selector, cellI, cellJ) {
    var selector = '.cell-' + cellI + '-' + cellJ;
    var elCell = document.querySelector(selector);
    elCell.classList.add('mark');
}

function removeMarkedCells() {
    var elMarkedCells = document.querySelectorAll('.mark');
    for (var i = 0; i < elMarkedCells.length; i++) {
        var markedCell = elMarkedCells[i];
        markedCell.classList.remove('mark');
    }
}
