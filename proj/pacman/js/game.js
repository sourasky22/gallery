'use strict';

var WALL = '#';
var FOOD = '.';
var EMPTY = ' ';

var gBoard;
var gState = {
  score: 0,
  isGameDone: false
};

function init() {
  gBoard = buildBoard();
  printMat(gBoard, '.boardContainer');
  console.table(gBoard);
}

function buildBoard() {
  var SIZE = 12;
  var board = [];
  for (var i = 0; i < SIZE; i++) {
    board[i] = [];
    for (var j = 0; j < SIZE; j++) {
      board[i][j] = FOOD;

      // Plcae WALLs 
      if (i === 0 || i === SIZE - 1 ||
        j === 0 || j === SIZE - 1 ||
        (j == 3 && i > 4 && i < SIZE - 2) ||
        (j == 8 && i > 4 && i < SIZE - 2) ||
        (j == 6 && i < 5 && i > 1)){

        board[i][j] = WALL;
      }
    }
  }
  createPacman(board);
  createGhosts(board);
  return board;
}

// This function is called from both pacman and ghost to check engage
function checkEngage(cell, opponent) {
  if (cell === opponent) {
    // TODO: basic support for eating power-ball (which is not in the game yet)
    if (gPacman.isSuper) {
      console.log('Ghost is dead');
    } else {
      clearInterval(gIntervalGhosts);
      gIntervalGhosts = undefined;
      gState.isGameDone = true;
      // TODO: GameOver popup with a play again button
      console.log('Game Over!');
      return true;
    }
  }
  return false;
}


// this function updates both the model and the dom for the score
function updateScore(value) {
  gState.score += value;
  var elScore = document.querySelector('.score')
  elScore.innerText = gState.score;
}

function renderCell(location, value) {
  var cellSelector = '.cell' + location.i + '-' + location.j;
  var elCell = document.querySelector(cellSelector);
  var piece =  getItemImg (value);
  elCell.innerHTML = piece;
}

function getItemImg (cell) {
 if (cell === PACMAN) return  '<img src="img/player.gif" class="pacman" style="transform: rotate('+gPacman.move+'deg)">';
 if (cell === WALL)return  '<img src="img/wall.png" class="wall">';
 if (cell === GHOST)return  '<img src="img/ghost.png" class="ghost">';
//  if (cell === FOOD)return  '<img src="img/cherry.gif" class="food">';
 if (cell === EMPTY)return  ' ';
 else return cell;
}

// function createDimonds() {

// }

