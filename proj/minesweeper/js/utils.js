


function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffle(items) {
    var j, tempItem, i;
    for (i = items.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        tempItem = items[i];
        items[i] = items[j];
        items[j] = tempItem;
    }
    return items;
}

function markCell(cellI, cellJ) {
    var selector = '.cell-' + cellI + '-' + cellJ;
    var elCell = document.querySelector(selector);
    elCell.classList.add('mark');
}
