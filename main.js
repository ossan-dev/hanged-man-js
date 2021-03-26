var wordToGuess = '';
var errorCount = -1;

function play() {
    if (document.getElementById('result-section').hasChildNodes()) {
        document.getElementById('result-section').removeChild(document.getElementById('result-section').childNodes[0]);
    }
    var parola = document.getElementById('word').value;
    if (parola === null || parola === '') {
        alert('inserisci una parola da indovinare');
    } else {
        wordToGuess = parola.toLowerCase();
        var gamePlay = document.getElementById('game-play');
        for (const char of parola) {
            var charNode = document.createElement('span');
            charNode.innerHTML = "_";
            charNode.classList.add('letter-' + char);
            gamePlay.appendChild(charNode);
        }
        printLetters();
    }
}

function printLetters() {
    var lettersGroup = document.getElementById('letters-group');
    const letters = 'abcdefghijklmnopqrstuvwxyz'.split('');
    for (const letter of letters) {
        var btn = document.createElement('button');
        btn.innerHTML = letter;
        btn.style.marginRight = "6px";
        btn.addEventListener('click', () => tryLetter(letter));
        lettersGroup.appendChild(btn);
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

        // check if the user won
        var gamePlay = document.getElementById('game-play');
        var spanInGamePlay = gamePlay.getElementsByTagName('span');
        var missingLetter = 0;
        for (const span of spanInGamePlay) {
            if (span.innerText === '_')
                missingLetter++;
        }
        if (missingLetter === 0) {
            // you won
            var resultNode = document.createElement('p');
            resultNode.innerHTML = "You win!";
            var resultSection = document.getElementById('result-section');
            resultSection.appendChild(resultNode);
            document.getElementById('button-section').getElementsByTagName('button')[0].disabled = true;
            var letters = document.getElementById('letters-group');
            var buttons = letters.getElementsByTagName('button');
            for (const button of buttons) {
                button.disabled = true;
            }
        }
    } else {
        errorCount++;
        if (errorCount === 6) {
            document.getElementById('hanged-img').src = './img/' + errorCount + '.jpg';
            var resultNode = document.createElement('p');
            resultNode.innerHTML = "You Lose!";
            var resultSection = document.getElementById('result-section');
            resultSection.appendChild(resultNode);
            document.getElementById('button-section').getElementsByTagName('button')[0].disabled = true;
            var letters = document.getElementById('letters-group');
            var buttons = letters.getElementsByTagName('button');
            for (const button of buttons) {
                button.disabled = true;
            }
        } else {
            // check if it's the first error made
            if (errorCount === 0) {
                var playArea = document.getElementById('play-area');
                var img = document.createElement('img');
                img.src = './img/' + errorCount + '.jpg';
                img.id = 'hanged-img';
                playArea.appendChild(img);
            } else {
                document.getElementById('hanged-img').src = './img/' + errorCount + '.jpg';
            }
        }

    }
}

function reset() {
    if (document.getElementById('result-section').hasChildNodes()) {
        document.getElementById('result-section').removeChild(document.getElementById('result-section').childNodes[0]);
    }
    document.getElementById('word').value = '';
    while (document.getElementById('game-play').hasChildNodes()) {
        document.getElementById('game-play').removeChild(document.getElementById('game-play').childNodes[0]);
    }
    if (document.getElementById('play-area').hasChildNodes()) {
        document.getElementById('play-area').removeChild(document.getElementById('play-area').childNodes[0]);
    }
    document.getElementById('button-section').getElementsByTagName('button')[0].disabled = false;
    var letters = document.getElementById('letters-group');
    var buttons = letters.getElementsByTagName('button');
    for (const button of buttons) {
        button.disabled = false;
    }
    wordToGuess = '';
    errorCount = -1;
}
