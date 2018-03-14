'use strict';

var gQuests;

var gCurrQuestIdx;

var gScore;

var isGameOn = true;

function initGame() {
    var elProgress = document.querySelector('.bar');
    elProgress.value = 0;
    gCurrQuestIdx = 0;
    gScore = 0;
    gQuests = createQuests();
    renderQuest();
    console.log(gQuests);
}

function createQuests() {

    var quests = [

        {
            id: 'youtube',
            opts: ['Instagram', 'Youtube'],
            correctOptIndex: 1
        },

        {
            id: 'kickstarter',
            opts: ['kickstarter', 'KFC'],
            correctOptIndex: 0
        },

        {
            id: 'dribbble',
            opts: ['dribbble', 'NBA'],
            correctOptIndex: 0
        },

        {
            id: 'whatsapp',
            opts: ['Messenger', 'Whatsapp'],
            correctOptIndex: 1
        },

        {
            id: 'skype',
            opts: ['Skype', 'Soundcloud'],
            correctOptIndex: 0
        },

        {
            id: 'snapchat',
            opts: ['Snapchat', 'Twitter'],
            correctOptIndex: 0
        },

        {
            id: 'instagram',
            opts: ['Instagram', 'Flicker'],
            correctOptIndex: 0
        },

        {
            id: 'twitter',
            opts: ['Apple', 'Twitter'],
            correctOptIndex: 1
        },

        {
            id: 'dropbox',
            opts: ['Pinterst', 'Dropbox'],
            correctOptIndex: 1
        },

        {
            id: 'soundcloud',
            opts: ['Soundcloud', 'Telegram'],
            correctOptIndex: 0
        }

    ];

    return quests;
}

function renderQuest() {

    var currId = gQuests[gCurrQuestIdx].id;
    var answer1 = gQuests[gCurrQuestIdx].opts[0];
    var answer2 = gQuests[gCurrQuestIdx].opts[1];
    var elQuestImg = document.querySelector('.questImage');
    var elAnsewer1 = document.querySelector('.quest1');
    var elAnswer2 = document.querySelector('.quest2');
    elQuestImg.innerHTML = '<img src="img/' + currId + '.png" class="guessImg">';
    elAnsewer1.innerHTML = answer1;
    elAnswer2.innerHTML = answer2;

}

function checkAnswer(optIdx) {

    var elProgress = document.querySelector('.bar');
    elProgress.value += 10;


    if (isGameOn) {

        var answer = gQuests[gCurrQuestIdx].correctOptIndex;

        if (optIdx === answer) {
            gCurrQuestIdx++;
            console.log('good job');
            updateScore(10);
            (gCurrQuestIdx < gQuests.length) ? renderQuest() : isGameOver();
        }

        else {
            gCurrQuestIdx++;
            console.log('wrong');
            (gCurrQuestIdx < gQuests.length) ? renderQuest() : isGameOver();
        }

    }

}

function updateScore(value) {
    gScore += value;
    // var elScore = document.querySelector('.score')
    // elScore.innerText = gScore;
}

function isGameOver() {
    if (gCurrQuestIdx === gQuests.length) {
        isGameOn=false;
        var elScore = document.querySelector('.speech')
        elScore.innerText = 'Good job your score is:  '+gScore+'';
    }
}


