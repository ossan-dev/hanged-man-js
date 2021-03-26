var wordToGuess = '';
var errorCount = 0;

function play() {
    var parola = document.getElementById('word').value;
    if (parola === null || parola === '') {
        alert('inserisci una parola da indovinare');
    } else {
        wordToGuess = parola.toLowerCase();
        var playArea = document.getElementById('play-area');
        var gamePlay = document.getElementById('game-play');
        for (const char of parola) {
            var charNode = document.createElement('span');
            charNode.innerHTML = "_";
            charNode.classList.add('letter-' + char);
            gamePlay.appendChild(charNode);
        }
        var img = document.createElement('img');

        img.src = './img/' + errorCount + '.jpg';
        img.id = 'hanged-img';
        playArea.appendChild(img);
    }
}

function tryLetter(letter) {
    var letters = document.getElementById('letters-group');
    var buttons = letters.getElementsByTagName('button');
    for (const button of buttons) {
        if (button.innerText === letter) {
            button.disabled = true;
        }
    }

    if (wordToGuess.indexOf(letter) > -1) {
        var gamePlay = document.getElementById('game-play');
        gamePlay.childNodes.forEach((child) => {
            var letterOfNode = child.classList[0].replace('letter-', '');
            if (letterOfNode === letter) {
                child.innerHTML = letter;
            }
        });
    } else {
        errorCount++;
        if (errorCount === 6) {
            document.getElementById('hanged-img').src = './img/' + errorCount + '.jpg';
            var resultNode = document.createElement('p');
            resultNode.innerHTML = "You Lose!";
            var resultSection = document.getElementById('result-section');
            resultSection.appendChild(resultNode);
            reset();
        } else {
            document.getElementById('hanged-img').src = './img/' + errorCount + '.jpg';
        }

    }
}

function reset() {
    document.getElementById('word').value = '';
    while (document.getElementById('game-play').hasChildNodes()) {
        document.getElementById('game-play').removeChild(document.getElementById('game-play').childNodes[0]);
    }
    document.getElementById('play-area').removeChild(document.getElementById('play-area').childNodes[0]);
    var letters = document.getElementById('letters-group');
    var buttons = letters.getElementsByTagName('button');
    for (const button of buttons) {
        button.disabled = false;
    }
    wordToGuess = '';
    errorCount = 0;
}
