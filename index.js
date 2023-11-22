class Player {
    constructor(name) {
      this.name = name;
      this.score = 0;
      this.htmlElement = null;
      this.scoreElement = null;
      this.addButton = null;
      this.decreaseButton = null;
      this.nameElement = null;
      this.buttonDivElement = null;
    }
  }

document.getElementById('player-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    document.getElementById('submitButton').style.display = 'none';

    const playerNamesInput = document.getElementById('player-names');
    const playerNames = playerNamesInput.value;
    const playerNamesArray = playerNames.split(',');
    let playerArrayObj = [];

    for (let i = 0; i < playerNamesArray.length; i++) {
        playerArrayObj.push(new Player(playerNamesArray[i]));
    }

    const errorMessage = document.getElementById('error-message');

    if (playerNames.trim() === '') {
        errorMessage.style.display = 'block';
        return;
    }

    errorMessage.style.display = 'none';

    const randomIndex = Math.floor(Math.random() * playerNamesArray.length);
    const randomPlayer = playerNamesArray[randomIndex];

    const resultDisplay = document.getElementById('result');
    resultDisplay.textContent = `The player who start ${randomPlayer}`;

    resultDisplay.classList.add('show');

    for (let i = 0; i < playerArrayObj.length; i++) {
        playerArrayObj[i].htmlElement = document.createElement('div');
        playerArrayObj[i].htmlElement.setAttribute('id', `div-${i}`);
        playerArrayObj[i].buttonDivElement = document.createElement('div');
        playerArrayObj[i].buttonDivElement.setAttribute('id', `button-div-${i}`);

        playerArrayObj[i].addButton = document.createElement('button');
        playerArrayObj[i].decreaseButton = document.createElement('button');
        playerArrayObj[i].scoreElement = document.createElement('span');
        playerArrayObj[i].scoreElement.textContent = `Families found: ${playerArrayObj[i].score}`;
        playerArrayObj[i].addButton.textContent = '+';
        playerArrayObj[i].decreaseButton.textContent = '-';
        playerArrayObj[i].nameElement = document.createElement('span');
        playerArrayObj[i].nameElement.textContent = `${playerArrayObj[i].name}`;
        
        document.getElementById("playerListDiv").appendChild(playerArrayObj[i].htmlElement);
        document.getElementById("playerListDiv").appendChild(playerArrayObj[i].buttonDivElement);
        document.getElementById(`div-${i}`).appendChild(playerArrayObj[i].nameElement);
        document.getElementById(`div-${i}`).appendChild(playerArrayObj[i].scoreElement);
        document.getElementById(`button-div-${i}`).appendChild(playerArrayObj[i].decreaseButton);
        document.getElementById(`button-div-${i}`).appendChild(playerArrayObj[i].addButton);

        playerArrayObj[i].addButton.addEventListener('click', function() {
            add(i);
            checkEndGame();
        });

        playerArrayObj[i].decreaseButton.addEventListener('click', function() {
            decrease(i);
            checkEndGame();
        });

        function add(index) {
            if (playerArrayObj[index].score < 8 ) {
                playerArrayObj[index].score++;
                playerArrayObj[index].scoreElement.textContent = `Families found: ${playerArrayObj[index].score}`;
            }
        }

        function decrease(index) {
            if (playerArrayObj[index].score > 0) {
                playerArrayObj[index].score--;
                playerArrayObj[index].scoreElement.textContent = `Families found: ${playerArrayObj[index].score}`;
            }
        }

        function checkEndGame() {
            let totalScore = 0;
            for (let i = 0; i < playerArrayObj.length; i++) {
                totalScore += playerArrayObj[i].score;
                if (totalScore === 7) {
                    fillLeaderboard();
                    
                    for (let i = 0; i < playerArrayObj.length; i++) {
                        playerArrayObj[i].addButton.disabled = true;
                        playerArrayObj[i].decreaseButton.disabled = true;
                        document.getElementById(`button-div-${i}`).style.display = 'none';
                    }
                    return true;
                }
            }
            return false;
        }

        function fillLeaderboard() {
            playerArrayObj.sort((a, b) => b.score - a.score);
            let currentLi = null;
            for (let i = 0; i < playerArrayObj.length; i++) {
                currentLi = document.getElementById(`playerN${i + 1}`);
                if (i === 0) {
                    currentLi.textContent = `The Winner is : ${playerArrayObj[i].name} with ${playerArrayObj[i].score} families found`;
                    currentLi.style.color = 'orange';
                }
                else {
                    currentLi.textContent = `Place N°${i + 1}: ${playerArrayObj[i].name} with ${playerArrayObj[i].score} families found`;
                }
                
                document.getElementById('leaderboard').appendChild(currentLi);
            }
        }

    }
});
